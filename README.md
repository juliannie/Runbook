# Runbook

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-username/runbook/actions)
[![License](https://img.shields.io/github/license/your-username/runbook)](./LICENSE)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-Next.js%2014%20%7C%20Prisma%20%7C%20SQLite-blue)](#-tech-stack)

> A professional-grade task management and operations tracking app.  
> Designed for teams and individuals who need recurring workflows (daily, weekly, monthly, quarterly, yearly) with audit-trail history and advanced working-day logic (e.g., negative offsets such as “last working day of the month”).

---

## 🚀 Features

- **Recurring Tasks with Working-Day Logic**
  - Daily, weekly, monthly, quarterly, yearly
  - Negative offsets supported (e.g., last working day)
  - Extensible for holiday calendars (German calendar planned)

- **Task Management**
  - Personalized **Todo** view for the signed-in user
  - Inline editing with live database updates
  - User-specific task assignments

- **Audit Trail**
  - `TaskOccurrence` table records daily execution
  - Complete history of status, assignee, and comments

- **Responsive UI**
  - Optimized for desktop, iPad, and iPhone
  - Built with [shadcn/ui](https://ui.shadcn.com) for a clean, modern interface

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14 (App Router)](https://nextjs.org/), [React](https://react.dev/), [shadcn/ui](https://ui.shadcn.com), [TanStack Table](https://tanstack.com/table)
- **Backend**: [Prisma ORM](https://www.prisma.io/), [Auth.js (NextAuth.js v5)](https://authjs.dev/)
- **Database**: [SQLite](https://www.sqlite.org/) (default for local development; can switch to PostgreSQL/MySQL later)
- **Other**: [TypeScript](https://www.typescriptlang.org/), [Zod](https://zod.dev) for schema validation

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/runbook.git
   cd runbook
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   - Copy `.env.example` → `.env.local`
   - Fill in:
     - `DATABASE_URL` (default is SQLite file: `file:./dev.db`)
     - Google OAuth Client ID & Secret (see [Google setup guide](https://developers.google.com/identity/protocols/oauth2))

4. **Run database migrations**
   ```bash
   bunx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

6. **Open in your browser**
   - [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
 ├─ app/            # Next.js App Router (routes & API endpoints)
 ├─ components/     # Reusable UI components
 ├─ lib/            # Utilities & DB connectors
 ├─ prisma/         # Prisma schema & migrations
 ├─ styles/         # Tailwind CSS + global styles
```

---

## 🔒 Authentication

- **Google OAuth** via [Auth.js v5](https://authjs.dev/)
- **Prisma Adapter** for user/account persistence
- **JWT-based sessions** (Edge-ready), extended to include `user.id`

---

## 📅 Roadmap

- [ ] Admin dashboard for task creation & assignment  
- [ ] Multi-tenant support (teams/organizations)  
- [ ] Email + Slack notification integration  
- [ ] Advanced analytics (completion rates, SLA breaches)  
- [ ] Holiday calendar support (e.g., German public holidays)

---

## 🤝 Contributing

1. Fork the repo  
2. Create a new branch  
   ```bash
   git checkout -b feature/xyz
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add xyz"
   ```
4. Push to your fork  
   ```bash
   git push origin feature/xyz
   ```
5. Open a **Pull Request**  

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 💡 Maintainer

Built with ❤️ by [Julian](https://github.com/juliannie)
