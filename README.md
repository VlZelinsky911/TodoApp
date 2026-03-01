# 📝 TodoApp

Full-stack Todo application with authentication built using modern technologies.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)

## 🏗️ Architecture

```
todo-app/
├── auth-service/     # Authentication microservice (port 5000)
├── main-service/     # Todo API microservice (port 5001)
└── client/           # React SPA (port 5173)
```

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Express 5** | REST API framework |
| **MongoDB + Mongoose** | Database & ODM |
| **Zod** | Runtime validation |
| **JWT** | Authentication tokens |
| **Pino** | Structured logging |
| **Helmet** | Security headers |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool |
| **TanStack Query** | Server state management |
| **React Hook Form** | Form handling |
| **React Router 6** | Routing |
| **Axios** | HTTP client |

## 📦 Services

### Auth Service (`auth-service/`)
Handles user authentication and authorization.

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `POST` | `/api/auth/logout` | Logout current session |
| `POST` | `/api/auth/logout-all` | Logout all sessions |
| `GET` | `/api/auth/me` | Get current user |

### Main Service (`main-service/`)
Handles todo CRUD operations.

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | List todos (with filters & pagination) |
| `GET` | `/api/todos/:id` | Get single todo |
| `POST` | `/api/todos` | Create todo |
| `PATCH` | `/api/todos/:id` | Update todo |
| `DELETE` | `/api/todos/:id` | Delete todo |
| `PATCH` | `/api/todos/:id/toggle` | Toggle completed status |
| `DELETE` | `/api/todos/bulk` | Bulk delete todos |

**Query Parameters:**
```
GET /api/todos?search=text&status=active&priority=high&page=1&limit=20&sortBy=createdAt&sortOrder=desc
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 22+
- Docker & Docker Compose
- Yarn

### 1. Clone & Install

```bash
git clone https://github.com/VlZelinsky911/TodoApp.git
cd TodoApp

# Install dependencies for each service
cd auth-service && yarn install && cd ..
cd main-service && yarn install && cd ..
cd client && yarn install && cd ..
```

### 2. Start Databases

```bash
# Auth service MongoDB (port 27017)
cd auth-service && docker-compose up -d

# Main service MongoDB (port 27018)
cd main-service && docker-compose up -d
```

### 3. Run Services

**Development mode:**
```bash
# Terminal 1 - Auth Service
cd auth-service && yarn dev

# Terminal 2 - Main Service
cd main-service && yarn dev

# Terminal 3 - Client
cd client && yarn dev
```

**Production mode:**
```bash
cd auth-service && yarn build && yarn start
cd main-service && yarn build && yarn start
cd client && yarn build && yarn preview
```

## 🔐 Environment Variables

### Auth Service (`auth-service/.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-service
ACCESS_TOKEN_SECRET=your-access-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
```

### Main Service (`main-service/.env`)
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27018/main-service
ACCESS_TOKEN_SECRET=your-access-secret
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5001
VITE_AUTH_URL=http://localhost:5000
```

## 📊 Data Models

### Todo
```typescript
interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  password: string; // hashed
  refreshTokens: RefreshToken[];
  createdAt: Date;
}
```

## 🧪 Testing

```bash
# Run all tests
yarn test

# Unit tests only
yarn test:unit

# Integration tests only
yarn test:integration
```

## 📁 Project Structure

```
service/
├── src/
│   ├── config/          # Environment, DB, CORS config
│   ├── middlewares/     # Auth, validation, error handling
│   ├── modules/         # Feature modules
│   │   └── todo/
│   │       ├── todo.types.ts       # TypeScript interfaces
│   │       ├── todo.dto.ts         # Data Transfer Objects
│   │       ├── todo.model.ts       # Mongoose schema
│   │       ├── todo.validation.ts  # Zod schemas
│   │       ├── todo.repository.ts  # Data access layer
│   │       ├── todo.service.ts     # Business logic
│   │       ├── todo.controller.ts  # Request handlers
│   │       ├── todo.routes.ts      # Express routes
│   │       ├── todo.mapper.ts      # Entity to DTO mapping
│   │       └── index.ts            # Barrel exports
│   ├── utils/           # Helpers (ApiError, logger, etc.)
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── docker-compose.yml   # MongoDB container
├── tsconfig.json
└── package.json
```

## ✨ Features

- [x] User registration & login
- [x] JWT authentication with refresh tokens
- [x] Todo CRUD operations
- [x] Filtering, sorting, pagination
- [x] Bulk delete
- [x] Form validation (Zod)
- [x] Error handling
- [x] Graceful shutdown
- [x] Structured logging
- [ ] Real-time updates (WebSocket)
- [ ] File attachments
- [ ] Todo sharing

## 📝 License

MIT © [VlZelinsky911](https://github.com/VlZelinsky911)
