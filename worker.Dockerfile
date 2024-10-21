FROM node:23.0.0-alpine

ENV NODE_ENV production

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

ARG UID=1001
ENV USER="app"

RUN adduser -D $USER -u $UID

# Copy package files and install dependencies
COPY --chown=$USER:$USER package*.json ./
COPY --chown=$USER:$USER tsconfig.json ./tsconfig.json
COPY --chown=$USER:$USER ./src/lib ./src/lib
COPY --chown=$USER:$USER ./src/workers ./src/workers
COPY --chown=$USER:$USER ./prisma ./prisma
COPY --chown=$USER:$USER ./prompts ./prompts

RUN npm install
RUN npm run prisma:generate_client

USER $USER

CMD ["npx", "tsx", "./src/workers/tasksWorker.ts"]
