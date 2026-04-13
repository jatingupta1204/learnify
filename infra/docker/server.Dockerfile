FROM node:20-alpine

WORKDIR /app/server

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY server/package.json server/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY server ./

EXPOSE 8000

CMD ["pnpm", "run", "dev"]
