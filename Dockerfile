ARG NODE_VERSION="22.11.0"
ARG ALPINE_VERSION="3.20"

#
# Stage 1: Install dependencies (including devDependencies)
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS base

WORKDIR /app

COPY package.json package-lock.json ./

# We cannot use --omit=dev here because devDependencies are needed for building
# So, keep this line like that:
RUN npm ci && \
    npm cache clean --force && \
    find . -name "*.map" -delete

#
# Stage 2: Build the application
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS builder
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

COPY . .

# Build-time arguments
ARG DOMAIN \
    NEXT_PUBLIC_URL \
    CREATE_IDEA_LIMITER_LIMIT \
    CREATE_IDEA_LIMITER_TIMEFRAME \
    IDEA_SERVICE_API_BASE \
    CONCEPT_SERVICE_API_BASE

# Set environment variables for the build
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PRISMA_HIDE_UPDATE_MESSAGE=1 \
    DOMAIN=$DOMAIN \
    NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL \
    CREATE_IDEA_LIMITER_LIMIT=$CREATE_IDEA_LIMITER_LIMIT \
    CREATE_IDEA_LIMITER_TIMEFRAME=$CREATE_IDEA_LIMITER_TIMEFRAME \
    IDEA_SERVICE_API_BASE=$IDEA_SERVICE_API_BASE \
    CONCEPT_SERVICE_API_BASE=$CONCEPT_SERVICE_API_BASE

RUN npm run build && \
    rm -rf .next/cache && \
    find . -name "*.map" -delete

#
# Stage 3: Install only production dependencies
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS prod_builder
WORKDIR /app

ENV NODE_ENV production

COPY --from=base /app/node_modules ./node_modules
COPY package.json package-lock.json ./

RUN npm ci --omit=dev && \
    find . -name "*.map" -delete && \
    cp -R node_modules prod_node_modules

#
# Stage 4: Runner - Final image to run the application
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS runner

WORKDIR /app

# Default user ID (must be overridden at build time)
ARG UID=1001

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    USER="app"

RUN adduser -D $USER -u $UID

COPY --from=prod_builder --chown=$USER:$USER /app/prod_node_modules ./node_modules
COPY --from=builder --chown=$USER:$USER /app/next.config.mjs ./
COPY --from=builder --chown=$USER:$USER /app/prisma ./prisma
COPY --from=builder --chown=$USER:$USER /app/public ./public
COPY --from=builder --chown=$USER:$USER /app/package.json ./package.json
COPY --from=builder --chown=$USER:$USER /app/.next/standalone ./
COPY --from=builder --chown=$USER:$USER /app/.next/static ./.next/static

USER $USER

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
