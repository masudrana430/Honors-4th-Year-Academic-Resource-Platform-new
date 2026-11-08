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

## 3. Google Drive Shared Drive Setup (required for Service Accounts)
**Important:** Google Service Accounts do not have personal Google Drive storage quota. Uploading into a regular user's My Drive can fail with `Service Accounts do not have storage quota`. Use a Google Workspace **Shared Drive** so the organization's storage quota is used.

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and enable the **Google Drive API** in the same project used by the service account.
2. Go to **IAM & Admin → Service Accounts**, create/use the service account, and copy its `client_email` and `private_key` into `GOOGLE_DRIVE_CLIENT_EMAIL` and `GOOGLE_DRIVE_PRIVATE_KEY`.
3. In Google Drive (Workspace account), create or open a **Shared Drive** and add the service account email as **Content manager** (or a role that can create and delete files).
4. Inside that Shared Drive, create a folder named `Honors_4th_Year`. Copy this folder's ID from its URL into `GOOGLE_DRIVE_FOLDER_ID`.
5. In Shared Drive settings, allow sharing with **Anyone with the link** if you want public visitors to open uploaded notes. The app creates a viewer permission for each uploaded file; organization policy may block this.
6. The Drive client now sets `supportsAllDrives` for folder lookup/creation, upload, sharing, and deletion.
7. Run `npm run drive:sync` to create/verify the `Honors_4th_Year/Subject_XX/Chapter_XX/Topic_XX` folder tree.

**If you use a personal `@gmail.com` account:** personal Google accounts generally do not offer Shared Drives. In that case this Service Account approach cannot use your personal Drive quota; the app must instead be switched to Google OAuth so uploads happen under your own Google account. Do not keep retrying the service-account upload to My Drive.

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


## 5. Admin Topic-wise Study Note Upload

1. Set a strong, random `ADMIN_UPLOAD_TOKEN` environment variable in your local `.env` and production hosting environment. Never use a `NEXT_PUBLIC_` prefix and never commit the real secret.
2. Configure the Google Drive service account and Shared Drive folder as described above. The service account needs Content manager access to the Shared Drive. Uploaded files are shared as **Anyone with the link — Viewer** if the Shared Drive's sharing policy allows it.
3. Open `/admin/notes`, enter the admin token, then choose Subject → Chapter → Topic.
4. Add a note title and optional description/author, select a PDF/JPG/PNG/WEBP file (maximum 4 MB), and upload.
5. The server uploads the file into the matching Google Drive topic folder and creates the linked StudyNote and File records in PostgreSQL. The existing chapter page displays the file under that topic.

The admin upload API is protected by the bearer token. The token is held in the page's memory only and is not saved to browser storage. If the token is missing or incorrect, the API returns 401.


### Vercel environment setup

For a Vercel deployment, open **Project → Settings → Environment Variables**, add `ADMIN_UPLOAD_TOKEN` with a long random value, and enable it for Production (and Preview if needed). Save the variable and redeploy the project so the server route can read it. Keep this value private; enter it only on `/admin/notes`.
