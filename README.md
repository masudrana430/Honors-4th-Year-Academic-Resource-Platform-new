# Honors 4th Year Academic Resource Platform

A complete, production-ready, mobile-first academic resource web platform built for Honours 4th Year students. Designed for public read-only student access (no login or registration barriers) with developer-controlled PostgreSQL + Prisma + Google Drive content management, bilingual Bangla/English Gemini AI search, and Browser Web Speech API voice commands.

## 1. Technology Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript (Strict Mode)
- **Styling & Icons**: Tailwind CSS, Lucide React
- **Database & ORM**: PostgreSQL + Prisma ORM (`prisma/schema.prisma`, `prisma/seed.ts`)
- **File Storage**: Google Drive API v3 (`googleapis` Service Account integration)
- **AI Academic Assistant**: Google Gemini API (`@google/generative-ai`) with PostgreSQL as the strict source of truth
- **Voice Search**: Browser Web Speech API (`en-US` and `bn-BD` Bangla support)

## 2. Local Setup Instructions

1. **Clone your repository and install dependencies**:
   ```bash
   git clone https://github.com/masudrana430/Honors-4th-Year-Academic-Resource-Platform.git
   cd Honors-4th-Year-Academic-Resource-Platform
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/honors_db"
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   GOOGLE_DRIVE_FOLDER_ID="YOUR_DRIVE_FOLDER_ID"
   GOOGLE_DRIVE_CLIENT_EMAIL="YOUR_SERVICE_ACCOUNT_EMAIL"
   GOOGLE_DRIVE_PRIVATE_KEY="YOUR_SERVICE_ACCOUNT_PRIVATE_KEY"
   ```

3. **Push Prisma Schema & Seed Sample Data**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

## 3. Google Drive Service Account Setup
1. Open the [Google Cloud Console](https://console.cloud.google.com/) and enable the **Google Drive API**.
2. Go to **IAM & Admin → Service Accounts** and create a Service Account.
3. Generate a JSON key and copy `client_email` (`GOOGLE_DRIVE_CLIENT_EMAIL`) and `private_key` (`GOOGLE_DRIVE_PRIVATE_KEY`) into your `.env`.
4. Create a root folder named `Honors_4th_Year` in your Google Drive, share it with your `GOOGLE_DRIVE_CLIENT_EMAIL` (Editor permission) and set general read permissions to **Anyone with the link can view** for public student study notes.
5. Copy the folder ID from the URL into `GOOGLE_DRIVE_FOLDER_ID`.
6. Run `npm run drive:sync` to automatically verify/create the `Honors_4th_Year/Subject_XX/Chapter_XX/Topic_XX` folder tree.

## 4. Deploying on Render (`render.yaml` Blueprint or Manual Web Service)
This repository includes a ready-to-use `render.yaml` Blueprint:
1. Push all files to `https://github.com/masudrana430/Honors-4th-Year-Academic-Resource-Platform`.
2. In your [Render Dashboard](https://dashboard.render.com/), click **New + → Blueprint** (or **New Web Service**) and connect your GitHub repository.
3. Set the Build Command to:
   ```bash
   npm install && npx prisma generate && npx prisma db push && npm run db:seed && npm run build
   ```
4. Set the Start Command to:
   ```bash
   npm run start
   ```
5. Add your environment variables (`DATABASE_URL`, `GEMINI_API_KEY`, `GOOGLE_DRIVE_FOLDER_ID`, `GOOGLE_DRIVE_CLIENT_EMAIL`, `GOOGLE_DRIVE_PRIVATE_KEY`) in Render's **Environment** tab.
