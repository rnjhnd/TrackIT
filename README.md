# TrackIT — IT Asset Operations Portal

A full-stack internal IT asset management platform with role-based access control, real-time inventory dashboards, and employee lifecycle tracking.

🔗 **Live Demo:** [trackit-portal.vercel.app](https://trackit-portal.vercel.app)

---

## Features

- **Role-Based Access Control** — Admin and Employee roles with distinct permissions
- **Asset Management** — Create, assign, update, and retire hardware assets
- **Employee Directory** — Register users, manage accounts, and track assignments
- **Analytics Dashboard** — Asset status breakdown, aging reports, and activity timelines
- **Secure Auth** — JWT authentication with HTTP-only token handling and rate limiting

---

## Demo Credentials

| Role     | Email                   | Password      |
|----------|-------------------------|---------------|
| Admin    | EMP-001                 | admin123      |
| Employee | EMP-002                 | employee123   |

> ⚠️ First load may take ~30 seconds as the free Render instance wakes from sleep.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite, TypeScript, TailwindCSS 4       |
| Backend    | Node.js, Express 5, TypeScript                  |
| ORM        | Prisma 5                                        |
| Database   | PostgreSQL via Neon (serverless)                |
| Auth       | JWT + bcryptjs                                  |
| Hosting    | Vercel (frontend) · Render (backend)            |

---

## Local Development

### Prerequisites
- Node.js 18+
- A PostgreSQL database (or a free [Neon](https://neon.tech) instance)

### 1. Clone the repository
```bash
git clone https://github.com/rnjhnd/TrackIT.git
cd TrackIT
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env   # fill in your DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run seed           # seeds demo users and sample assets
npm run dev            # starts on http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
npm install
# create frontend/.env with:
# VITE_API_URL=http://localhost:5000
npm run dev            # starts on http://localhost:5173
```

---

## Project Structure

```
TrackIT/
├── frontend/          # React + Vite client
│   └── src/
│       ├── api/       # Axios API layer
│       ├── components/# Reusable UI components and modals
│       ├── contexts/  # Auth context (JWT state)
│       ├── pages/     # Route-level page components
│       └── types/     # Global TypeScript interfaces
│
├── backend/           # Express API server
│   └── src/
│       ├── middleware/# Auth + role guards
│       ├── routes/    # assets, users, auth, categories
│       └── types/     # Express request augmentation
│
├── render.yaml        # Render deployment blueprint
└── README.md
```
