This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Backend setup (Prisma + SQLite)

1. Create `.env` with:

```bash
DATABASE_URL="file:./prisma/dev.db"
```

2. Install deps (choose one):

```bash
npm i -D prisma && npm i @prisma/client
# or
pnpm add -D prisma && pnpm add @prisma/client
```

3. Generate client and run migration:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. (Optional) Seed via API or `npx prisma studio`.
