# DataLens — Full-Stack Data Analysis App

A production-grade data analysis platform built with **React + Vite**, **Node.js + Express**, and **MongoDB Atlas**, fully Dockerized and deployable to **AWS ECS Fargate**.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Recharts, React Query |
| Backend    | Node.js, Express, JWT Auth, Multer, csv-parse |
| Database   | MongoDB Atlas (Mongoose ODM)       |
| Container  | Docker (multi-stage builds), Nginx |
| CI/CD      | GitHub Actions                    |
| Cloud      | AWS ECS Fargate, ECR, ALB, Route 53, Secrets Manager |

---

## Local Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MongoDB Atlas account (free tier works)

### Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd data-analysis-app

# 2. Configure backend environment
cp backend/.env.example backend/.env
# Edit backend/.env and fill in MONGO_URI and JWT_SECRET

# 3. Run with Docker Compose
docker compose up --build

# App available at:
#   Frontend  → http://localhost:3000
#   Backend   → http://localhost:5000
#   Health    → http://localhost:5000/api/health
```

### Running without Docker

```bash
# Backend
cd backend
npm install
npm run dev   # starts on :5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev   # starts on :3000
```

---

## API Reference

### Auth
| Method | Endpoint              | Body                        | Description     |
|--------|-----------------------|-----------------------------|-----------------|
| POST   | /api/auth/register    | `{name, email, password}`   | Register user   |
| POST   | /api/auth/login       | `{email, password}`         | Login, get JWT  |

### Datasets (requires `Authorization: Bearer <token>`)
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | /api/datasets             | List all datasets            |
| GET    | /api/datasets/:id         | Get dataset + 20-row preview |
| POST   | /api/datasets/upload      | Upload CSV (multipart/form-data) |
| DELETE | /api/datasets/:id         | Delete a dataset             |

### Analytics (requires auth)
| Method | Endpoint                        | Query params       | Description              |
|--------|---------------------------------|--------------------|--------------------------|
| GET    | /api/analytics/:datasetId       | `field=columnName` | Stats + histogram        |

---

## Deployment to AWS

### Prerequisites
- AWS CLI configured
- ECR repositories created: `dataapp-frontend`, `dataapp-backend`
- ECS cluster: `dataapp-cluster`
- ECS services: `dataapp-frontend`, `dataapp-backend`

### GitHub Secrets required
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ACCOUNT_ID
```

### Push to deploy
```bash
git push origin main
# GitHub Actions automatically: lint → test → build → push to ECR → deploy to ECS
```

---

## Project Structure

```
data-analysis-app/
├── frontend/           # React + Vite SPA
│   ├── src/
│   │   ├── components/ # Reusable UI & chart components
│   │   ├── pages/      # Route-level page components
│   │   ├── hooks/      # React Query hooks
│   │   └── services/   # Axios API client
│   ├── Dockerfile      # Multi-stage: Node build → Nginx serve
│   └── nginx.conf      # SPA routing + API proxy
├── backend/            # Node.js + Express REST API
│   ├── src/
│   │   ├── config/     # Database connection
│   │   ├── controllers/# Route handlers
│   │   ├── middlewares/# Auth, upload, error handling
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # Express routers
│   │   └── utils/      # CSV parser
│   ├── tests/          # Jest + Supertest
│   └── Dockerfile      # Node Alpine image
├── .github/workflows/  # GitHub Actions CI/CD
├── docker-compose.yml  # Local orchestration
└── README.md
```

---

## License
MIT
