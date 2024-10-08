# Install dependencies only when needed
FROM node:22.9.0-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --update --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Rebuild the source code only when needed
FROM node:22.9.0-alpine AS builder
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:22.9.0-alpine AS prod_builder
WORKDIR /app

ENV NODE_ENV production

COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN npm install && \
    cp -R node_modules prod_node_modules

# Production image, copy all the files and run next
FROM node:22.9.0-alpine AS runner
RUN apk add --update --no-cache curl=8.9.1-r2

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG UID=1001
ENV USER="app"

RUN adduser -D $USER -u $UID

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=$USER:$USER /app/next.config.mjs ./
COPY --from=builder --chown=$USER:$USER /app/public ./public
COPY --from=builder --chown=$USER:$USER /app/package.json ./package.json
COPY --from=prod_builder --chown=$USER:$USER /app/prod_node_modules ./node_modules

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=$USER:$USER /app/.next/standalone ./
COPY --from=builder --chown=$USER:$USER /app/.next/static ./.next/static

USER $USER

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
