# 🔐 Auth Service Frontend

Modern React application for authentication with JWT token management, automatic token refresh, and protected routes.

## ✨ Features

- 🔑 **JWT Authentication** — Login, Register, Logout
- 🔄 **Automatic Token Refresh** — Seamless token rotation with axios interceptors
- 🛡️ **Protected Routes** — Role-based access control
- 📝 **Form Validation** — Client-side validation with Zod schemas
- 🎨 **Clean UI** — Responsive design with CSS modules
- ⚡ **Fast Development** — Vite + Hot Module Replacement

## 🛠️ Tech Stack

| Category    | Technology            |
| ----------- | --------------------- |
| Framework   | React 19 + TypeScript |
| Build Tool  | Vite 6                |
| Routing     | React Router 7        |
| HTTP Client | Axios                 |
| Validation  | Zod 3                 |
| Forms       | React Hook Form       |

## 📁 Project Structure

```
src/
├── api/              # Axios instance & API calls
│   ├── axios.ts      # Configured axios with interceptors
│   └── auth.ts       # Auth API methods
├── components/       # Reusable UI components
│   ├── Button/
│   ├── FormInput/
│   ├── FormError/
│   └── Spinner/
├── context/          # React Context providers
│   └── AuthContext.tsx
├── hooks/            # Custom hooks
│   └── useAuth.ts
├── pages/            # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── routes/           # Route guards
│   ├── ProtectedRoute.tsx
│   └── GuestRoutes.tsx
├── schemas/          # Zod validation schemas
├── store/            # Token storage
├── styles/           # Global styles
└── types/            # TypeScript types
```

## 🔄 Token Flow

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Login     │ ───► │  Store AT   │ ───► │  API Call   │
│   Page      │      │  in Memory  │      │  with AT    │
└─────────────┘      └─────────────┘      └─────────────┘
                                                 │
                                                 ▼
                                          ┌─────────────┐
                                          │ 401 Error?  │
                                          └─────────────┘
                                                 │
                           ┌─────────────────────┴─────────────────────┐
                           ▼                                           ▼
                    ┌─────────────┐                             ┌─────────────┐
                    │   Refresh   │                             │   Reject    │
                    │   Token     │                             │   Error     │
                    └─────────────┘                             └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Retry      │
                    │  Request    │
                    └─────────────┘
```

### Key Features:

- **Access Token** stored in memory (not localStorage) for security
- **Refresh Token** stored in httpOnly cookie (handled by browser)
- **Automatic Retry** — Failed requests are queued and retried after refresh
- **Concurrent Requests** — Multiple 401s trigger only one refresh

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Backend server running at `http://localhost:5000`

### Installation

```bash
# Clone repository
git clone https://github.com/VlZelinsky911/auth-service-frontend.git
cd auth-service-frontend

# Install dependencies
yarn install

# Start development server
yarn dev
```

Application runs at `http://localhost:5173`

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## 📜 Available Scripts

```bash
yarn dev        # Start development server
yarn build      # Build for production
yarn preview    # Preview production build
yarn lint       # Run ESLint
```

## 🛣️ Routes

| Path         | Access        | Description         |
| ------------ | ------------- | ------------------- |
| `/login`     | Guest only    | Login page          |
| `/register`  | Guest only    | Registration page   |
| `/dashboard` | Authenticated | Protected dashboard |

### Route Guards

- **GuestRoute** — Redirects authenticated users to `/dashboard`
- **ProtectedRoute** — Redirects unauthenticated users to `/login`

## 🧩 Components

### Button

```tsx
<Button variant="primary" isLoading={isSubmitting} fullWidth>
  Sign In
</Button>
```

### FormInput

```tsx
<FormInput
  label="Email"
  type="email"
  error={errors.email?.message}
  {...register("email")}
/>
```

### Spinner

```tsx
<Spinner size="sm" />           // Inside buttons
<Spinner fullscreen />          // Page loading
```

## 🔐 Authentication Context

```tsx
const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();

// Login
await login(email, password);

// Register
await register(email, password);

// Logout
await logout();
```

## 📝 Form Validation

Validation schemas are defined with Zod:

```typescript
// schemas/auth.schemas.ts
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
```

## 🔗 Related

- [Auth Service Backend](https://github.com/VlZelinsky911/auth-service-backend) — REST API with JWT authentication

## 📄 License

MIT
