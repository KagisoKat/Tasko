# 🎯 Tasko - Task Management Application

A full-stack task management application built with the PERN stack (PostgreSQL, Express, React, Node.js), featuring Docker containerization and CI/CD pipeline with Jenkins.

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Task status management (Pending, In Progress, Completed)
- ✅ Real-time updates
- ✅ Responsive design
- ✅ RESTful API
- ✅ PostgreSQL database with connection pooling
- ✅ Docker containerization
- ✅ Jenkins CI/CD pipeline
- ✅ Comprehensive test coverage

## 🛠️ Tech Stack

**Frontend:**

- React 18
- Axios for API calls
- Modern CSS with animations

**Backend:**

- Node.js & Express
- PostgreSQL with node-pg
- Jest & Supertest for testing
- Helmet.js & CORS for security
- Morgan for logging

**DevOps:**

- Docker & Docker Compose
- Jenkins for CI/CD
- AWS deployment ready

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

## ⚡ Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd Tasko

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Database: localhost:5432
```

### Local Development

**Backend:**

```bash
cd backend
npm install
npm start
```

**Frontend:**

```bash
cd frontend
npm install
npm start
```

## 🧪 Running Tests

```bash
cd backend
npm test
npm run test:coverage
```

## 📚 API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/health`        | Health check          |
| GET    | `/db-health`     | Database health check |
| GET    | `/api/tasks`     | Get all tasks         |
| GET    | `/api/tasks/:id` | Get task by ID        |
| POST   | `/api/tasks`     | Create new task       |
| PUT    | `/api/tasks/:id` | Update task           |
| DELETE | `/api/tasks/:id` | Delete task           |

## 🌐 Environment Variables

**Backend (.env):**

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

**Frontend (.env):**

```
REACT_APP_API_URL=http://localhost:5000
```

## 📦 Project Structure

```
Tasko/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── init.sql
│   │   ├── tests/
│   │   │   └── server.test.js
│   │   └── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── jenkins/
│   └── Jenkinsfile
├── docker-compose.yml
└── README.md
```

## 🚢 Deployment

Refer to `README-SETUP.md` for detailed deployment instructions including:

- AWS deployment with EC2 and RDS
- CI/CD pipeline setup
- Production configuration
- Monitoring and logging

## 🔧 Troubleshooting

**Database connection issues:**

```bash
# Check if PostgreSQL container is running
docker ps

# View PostgreSQL logs
docker-compose logs db
```

**Port conflicts:**

```bash
# Check ports in use
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Your Name - [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Built as part of DevOps learning journey
- Demonstrates full-stack and DevOps skills
- Production-ready architecture

---

**⭐ Star this repo if you found it helpful!**
