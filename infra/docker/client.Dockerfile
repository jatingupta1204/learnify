FROM node:20-alpine

WORKDIR /app/client

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY client ./

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
