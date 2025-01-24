ARG NODE_VERSION="22.11.0"
ARG ALPINE_VERSION="3.20"
ARG NPM_CONFIG_REGISTRY="https://registry.npmjs.org/"

#
# Stage 1: Install dependencies (including devDependencies)
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS base

WORKDIR /app

COPY package.json package-lock.json ./

# We cannot use --omit=dev in `npm ci` because devDependencies are needed for building
# So, keep this line like that:
RUN npm config set registry "${NPM_CONFIG_REGISTRY}" && \
    npm ci --no-audit && \
    find . -name "*.map" -delete

#
# Stage 2: Build the application
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS builder
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

COPY . .

ARG DOMAIN \
    NEXT_PUBLIC_URL \
    CREATE_IDEA_LIMITER_LIMIT \
    CREATE_IDEA_LIMITER_TIMEFRAME \
    IDEA_SERVICE_API_BASE \
    CONCEPT_SERVICE_API_BASE

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
    find . -name "*.map" -delete

#
# Stage 3: Install only production dependencies
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS prod_builder
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm config set registry "${NPM_CONFIG_REGISTRY}" && \
    npm ci --no-audit --omit=dev && \
    find . -name "*.map" -delete

#
# Stage 4: Runner - Final image to run the application
#
FROM node:"${NODE_VERSION}"-alpine"${ALPINE_VERSION}" AS runner

WORKDIR /app

# Default user ID (must be overridden at build time)
ARG UID=1001

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    USER="app"

RUN addgroup --system --gid $UID $USER && \
    adduser --system --uid $UID $USER

COPY --from=prod_builder --chown=$USER:$USER /app/node_modules ./node_modules
COPY --from=builder --chown=$USER:$USER /app/next.config.mjs ./
COPY --from=builder --chown=$USER:$USER /app/prisma ./prisma
COPY --from=builder --chown=$USER:$USER /app/public ./public
COPY --from=builder --chown=$USER:$USER /app/package.json ./package.json
COPY --from=builder --chown=$USER:$USER /app/.next/standalone ./
COPY --from=builder --chown=$USER:$USER /app/.next/static ./.next/static

USER $USER

EXPOSE $PORT

CMD ["node", "server.js"]
