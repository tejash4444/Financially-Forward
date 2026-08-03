<div align="center">
  <img src="logo.svg" alt="Financially Forward Logo" width="80" height="80" />
  <h1>💰 Financially Forward</h1>
  <p><strong>A modern, full-stack personal finance management platform built with Next.js 14</strong></p>
  <p>Track transactions, manage accounts & categories, visualize spending patterns, and take control of your financial future.</p>

  <br />

  ![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.30-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
  ![Hono](https://img.shields.io/badge/Hono-4.6-E36002?style=for-the-badge&logo=hono&logoColor=white)
  ![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

  <br />

  [Live Demo](#-demo) · [Features](#-features) · [Tech Stack](#%EF%B8%8F-tech-stack) · [Getting Started](#-getting-started) · [Architecture](#-architecture)

</div>

<br />

---

## ✨ Features

<table>
  <tr>
    <td width="50%">

### 📊 Interactive Dashboard
- Real-time financial overview with animated stat cards
- Area, Bar, and Line chart visualizations
- Spending breakdown with Pie, Radar & Radial charts
- Date range & account-based filtering

</td>
    <td width="50%">

### 💳 Transaction Management
- Full CRUD operations for transactions
- Bulk CSV import with column mapping
- Category assignment & payee tracking
- Sortable, filterable data tables

</td>
  </tr>
  <tr>
    <td width="50%">

### 🏦 Account & Category System
- Multi-account financial tracking
- Custom spending categories
- Bulk delete operations
- Relational data with cascading rules

</td>
    <td width="50%">

### 🔐 Authentication & Security
- Secure authentication via Clerk
- Protected API routes & middleware
- User-scoped data isolation
- Edge-compatible middleware

</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|:---|:---|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn/UI** | Accessible, customizable UI components |
| **Recharts** | Data visualization & chart rendering |
| **TanStack React Query** | Server state management & caching |
| **TanStack React Table** | Headless, sortable data tables |
| **React Hook Form + Zod** | Form management & schema validation |
| **Zustand** | Lightweight client state management |

### Backend
| Technology | Purpose |
|:---|:---|
| **Hono** | Ultrafast Edge-compatible API framework |
| **Drizzle ORM** | Type-safe SQL queries & migrations |
| **Neon (PostgreSQL)** | Serverless Postgres database |
| **Clerk** | Authentication & user management |

---

## 🏗 Architecture

```
financially-forward/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── sign-in/               # Clerk Sign In
│   │   └── sign-up/               # Clerk Sign Up
│   ├── (dashboard)/               # Protected dashboard routes
│   │   ├── accounts/              # Accounts management page
│   │   ├── categories/            # Categories management page
│   │   ├── transactions/          # Transactions page + CSV import
│   │   ├── layout.tsx             # Dashboard shell layout
│   │   └── page.tsx               # Dashboard overview
│   └── api/
│       └── [[...route]]/          # Hono API catch-all route
│           ├── accounts.ts        # Accounts CRUD endpoints
│           ├── categories.ts      # Categories CRUD endpoints
│           ├── transactions.ts    # Transactions CRUD endpoints
│           ├── summary.ts         # Dashboard analytics endpoint
│           └── route.ts           # Hono app mounting
├── components/
│   ├── ui/                        # Shadcn UI primitives
│   ├── data-grid.tsx              # Dashboard stat cards grid
│   ├── data-charts.tsx            # Chart visualization wrapper
│   ├── data-table.tsx             # Reusable data table component
│   ├── header.tsx                 # Application header + navigation
│   └── ...                        # Chart variants, filters, tooltips
├── features/
│   ├── accounts/                  # Account feature module
│   │   ├── api/                   # React Query hooks (CRUD)
│   │   ├── components/            # Account forms & sheets
│   │   └── hooks/                 # Modal state hooks
│   ├── categories/                # Category feature module
│   ├── transactions/              # Transaction feature module
│   └── summary/                   # Summary analytics module
├── db/
│   ├── drizzle.ts                 # Database client configuration
│   └── schema.ts                  # Drizzle table definitions
├── drizzle/                       # SQL migration files
├── lib/                           # Shared utilities (Hono client, utils)
├── providers/                     # React context providers
└── middleware.ts                  # Clerk auth middleware
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **Neon** PostgreSQL database ([neon.tech](https://neon.tech))
- **Clerk** account ([clerk.com](https://clerk.com))

### 1. Clone the Repository

```bash
git clone https://github.com/tejash4444/Financially-Forward.git
cd Financially-Forward
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 4. Run Database Migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Drizzle Studio (DB GUI) |

---

## 🗄️ Database Schema

```mermaid
erDiagram
    ACCOUNTS ||--o{ TRANSACTIONS : has
    CATEGORIES ||--o{ TRANSACTIONS : has

    ACCOUNTS {
        text id PK
        text plaid_id
        text name
        text user_id
    }

    CATEGORIES {
        text id PK
        text plaid_id
        text name
        text user_id
    }

    TRANSACTIONS {
        text id PK
        integer amount
        text payee
        text notes
        timestamp date
        text account_id FK
        text category_id FK
    }
```

---

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tejash4444/Financially-Forward)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">
  <br />
  <p>Built by <a href="https://github.com/tejash4444">Tejash Poddar</a></p>
  <p>
    <a href="https://github.com/tejash4444/Financially-Forward/stargazers">⭐ Star this repo</a> if you found it useful!
  </p>
</div>
     