# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration (for magic links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Public environment variables (for client-side)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
```

## Setup Steps

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

3. **Run database migration:**

   ```bash
   npx prisma migrate dev --name add-auth
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Email Provider Setup

For Gmail:

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password as `EMAIL_SERVER_PASSWORD`

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`

## Features

- ✅ Email magic link authentication
- ✅ Google OAuth (optional)
- ✅ User-scoped data (all tasks/occurrences are private to each user)
- ✅ Protected app routes
- ✅ Public marketing pages
- ✅ User menu with sign out
- ✅ JWT sessions with user ID and role

## Testing

1. Visit `/auth/signin` to sign in
2. Visit `/todo` or `/tasks` (requires authentication)
3. Create tasks - they will be scoped to your user
4. Sign out and sign in with different email - you won't see other users' tasks
