# 🛠 Project Setup (Manual + Docker)

## MANUAL SETUP

### 1. Clone the repository

```
git clone https://github.com/jatingupta1204/learnify.git
cd learnify
```

### 2. Install backend dependencies

```
cd server
pnpm install
```

### 3. Install frontend dependencies

```
cd ../client
pnpm install
```

### 4. Create local env files

Copy the examples and fill in safe local values:

```
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 5. Configure `server/.env`

```
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/learnify
SECRET_KEY=local-dev-secret
CLOUD_NAME=
API_KEY=
API_SECRET=
RAZORPAY_ID_KEY=
RAZORPAY_SECRET_KEY=
RAZORPAY_WEBHOOK_SECRET=
```

### 6. Run backend

```
cd server
pnpm dev
```

### 7. Run frontend

```
cd client
pnpm dev
```

Your local setup will run on:
Backend → http://localhost:8000  
Frontend → http://localhost:5173

> Manual host dev requires MongoDB running locally at `mongodb://localhost:27017/learnify`.

# 🐳 DOCKER SETUP

### 1. Create local env files

Copy the example env files first:

```
cp server/.env.docker.example server/.env.docker
cp client/.env.example client/.env
```

### 2. Configure `server/.env.docker`

```
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://mongo:27017/learnify
SECRET_KEY=local-dev-secret
CLOUD_NAME=
API_KEY=
API_SECRET=
RAZORPAY_ID_KEY=
RAZORPAY_SECRET_KEY=
RAZORPAY_WEBHOOK_SECRET=
```

### 3. Start the stack

```
docker compose -f infra/docker-compose.yml up --build
```

App runs at:
http://localhost:5173

> Docker setup includes MongoDB through the compose stack.

### 4. Stop containers

```
docker compose -f infra/docker-compose.yml down
```
