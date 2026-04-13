# Infra

Use `infra/docker-compose.yml` for the local all-docker stack.

Before starting, copy `server/.env.docker.example` to `server/.env.docker` and keep `client/.env` locally.

MongoDB is included in the Docker stack.

## Start

```bash
docker compose -f infra/docker-compose.yml up --build
```

## Stop

```bash
docker compose -f infra/docker-compose.yml down
```
