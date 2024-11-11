ARG NODE_VERSION="22.11.0"
ARG ALPINE_VERSION="3.20"
ARG NPM_SHARP_VERSION="0.33.5"

# Install dependencies only when needed
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install sharp@${NPM_SHARP_VERSION} && npm ci

# Rebuild the source code only when needed
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ARG DOMAIN
ENV DOMAIN=$DOMAIN

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG SENTRY_DSN
ENV SENTRY_DSN=$SENTRY_DSN

ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL

ARG CREATE_IDEA_LIMITER_LIMIT
ENV CREATE_IDEA_LIMITER_LIMIT=$CREATE_IDEA_LIMITER_LIMIT

ARG CREATE_IDEA_LIMITER_TIMEFRAME
ENV CREATE_IDEA_LIMITER_TIMEFRAME=$CREATE_IDEA_LIMITER_TIMEFRAME

ARG IDEA_SERVICE_API_BASE
ENV IDEA_SERVICE_API_BASE=$IDEA_SERVICE_API_BASE

ARG CONCEPT_SERVICE_API_BASE
ENV CONCEPT_SERVICE_API_BASE=$CONCEPT_SERVICE_API_BASE

ARG FEEDBACK_SERVICE_API_BASE
ENV FEEDBACK_SERVICE_API_BASE=$FEEDBACK_SERVICE_API_BASE

RUN npm run prisma:generate_client && \
    npm run build

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS prod_builder
WORKDIR /app

ENV NODE_ENV production

COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN npm install && \
    npm run prisma:generate_client && \
    cp -R node_modules prod_node_modules

# Production image, copy all the files and run next
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG UID=1001
ENV USER="app"

RUN adduser -D $USER -u $UID

# You only need to copy next.config.mjs if you are NOT using the default configuration
COPY --from=builder --chown=$USER:$USER /app/next.config.mjs ./
COPY --from=builder --chown=$USER:$USER /app/prisma ./prisma
COPY --from=builder --chown=$USER:$USER /app/public ./public
COPY --from=builder --chown=$USER:$USER /app/package.json ./package.json
COPY --from=prod_builder --chown=$USER:$USER /app/prod_node_modules ./node_modules

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
COPY --from=builder --chown=$USER:$USER /app/.next/standalone ./
COPY --from=builder --chown=$USER:$USER /app/.next/static ./.next/static

USER $USER

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
