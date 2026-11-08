# Google Drive OAuth setup (Personal Gmail)

This project uses **Google OAuth with your personal Gmail account**. Uploaded files consume storage in that account's My Drive. A service account and Shared Drive are not required.

## 1. Configure Google Cloud

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select the project used by this website.
2. Enable **Google Drive API**.
3. Open **Google Auth Platform** (or APIs & Services → OAuth consent screen). Configure the app as **External**, add your Gmail as a test user while testing, and complete the required app details.
4. Create **OAuth client ID → Web application**.
5. Add this exact Authorized redirect URI (replace with your deployed domain):
   `https://YOUR_DOMAIN/api/google-drive/oauth/callback`
6. Copy the Client ID and Client Secret.

The app requests the narrower `https://www.googleapis.com/auth/drive.file` scope. It can manage files and folders created by this app, without broad access to all files in your Drive. Google may show an unverified-app warning. While the OAuth consent screen is in **Testing**, refresh tokens for external apps using Drive scopes expire after 7 days. Move the consent app to **In production** for a durable setup; Google may require verification depending on the app's use and scope.

## 2. Set environment variables

Set these server-side variables in Vercel → Project → Settings → Environment Variables:

- `GOOGLE_DRIVE_CLIENT_ID`
- `GOOGLE_DRIVE_CLIENT_SECRET`
- `GOOGLE_DRIVE_REDIRECT_URI` (must exactly match the registered callback URL)
- `GOOGLE_DRIVE_OAUTH_SETUP_SECRET` (a long random secret used only to protect the one-time setup URL)
- `GOOGLE_DRIVE_REFRESH_TOKEN` (obtained in the next step)

Never use a `NEXT_PUBLIC_` prefix for these values. Never commit the client secret or refresh token.

## 3. Authorize your Gmail once

After deploying with the OAuth client ID, client secret, redirect URI and setup secret configured (the refresh token can be blank/absent temporarily), open this URL while signed into the intended Gmail account:

`https://YOUR_DOMAIN/api/google-drive/oauth/start?key=YOUR_GOOGLE_DRIVE_OAUTH_SETUP_SECRET`

Replace the domain and setup secret. Review the Google consent screen and allow Drive access. The callback returns JSON containing `refresh_token`. Copy it immediately into Vercel as `GOOGLE_DRIVE_REFRESH_TOKEN`, then redeploy. Keep the token private. If Google does not return a refresh token, remove this app's access from your Google Account's third-party connections and repeat authorization.

Once configured, site visitors do **not** need to sign in to Google. The server creates an `Honors_4th_Year` folder and topic subfolders in the owner's My Drive, then uploads their submitted notes using the owner's OAuth refresh token.

## 4. Public link access

The upload route sets each uploaded file to **Anyone with the link — Viewer**. This is necessary for students to view files without signing into the owner's account. The app can only manage files/folders it created under the `drive.file` scope. If your Google account or organization policy blocks public link sharing, the permission step will fail.

## 5. Security notes

- OAuth credentials and refresh token are server-only secrets.
- The OAuth setup endpoint is protected by `GOOGLE_DRIVE_OAUTH_SETUP_SECRET`; remove that variable after successful setup or rotate it after use.
- Public note uploads should have rate limiting and moderation before a production launch. Do not expose public note deletion to untrusted visitors.
