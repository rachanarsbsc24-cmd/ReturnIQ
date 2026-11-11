# ReturnIQ — Return Intelligence Platform

ReturnIQ is a React dashboard for recording and analyzing e-commerce product returns. This version includes a Node/Express API, MongoDB persistence, and JWT-based account authentication.

## Features

- Dashboard overview and return-status summaries
- Create, edit, update status, and delete return records
- Search, filter, sort, and date-range filtering
- Return reason and product analytics
- CSV export, bulk actions, printable analytics, and overdue monitoring (where included in the frontend)
- MongoDB persistence instead of browser-only storage
- Account registration and sign-in
- Password hashing with bcrypt and signed JWT sessions
- Return records are scoped to the signed-in account
- Basic API security headers, request size limits, CORS, and authentication rate limiting

## Requirements

- Windows 10/11, macOS, or Linux
- Node.js 20.19+ or 22.12+ (recommended for Vite 8)
- MongoDB Community Server running locally, or a MongoDB connection URI

## 1. Configure MongoDB and the API

Open a terminal in the project root, then:

```powershell
cd server
Copy-Item .env.example .env
```

Open `server/.env` and set a private JWT secret. In PowerShell, you can generate one with:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Paste the generated value after `JWT_SECRET=` in `server/.env`. Keep `.env` private; it is excluded from Git.

Default local settings:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/returniq
JWT_SECRET=your-generated-secret
CLIENT_ORIGIN=http://localhost:5173
```

Install and start the backend:

```powershell
npm install
npm run dev
```

The API health endpoint is `http://localhost:5000/api/health`.

### Check MongoDB on Windows

In PowerShell:

```powershell
Get-Service MongoDB
```

If it is stopped, open PowerShell as Administrator and run:

```powershell
Start-Service MongoDB
```

## 2. Start the React frontend

Keep the backend terminal running. Open a second terminal at the project root:

```powershell
cd client
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). The Vite development server forwards `/api` requests to the backend at port 5000.

## 3. Create an account and test

1. Choose **Create an account** and register with a name, email, and password of at least 8 characters.
2. Sign in. On a new account, ReturnIQ inserts the sample return records to make the dashboard useful for the first demo.
3. Add a return record, change its status, and delete a test record.
4. Refresh the browser. Your saved records should remain because they are stored in MongoDB.
5. Sign out and sign in again to verify authentication.
6. Register a second test account and confirm it cannot see the first account's returns.

MongoDB Compass can connect with `mongodb://127.0.0.1:27017`. The database is `returniq`; collections are `users` and `returns`.

## API routes

### Authentication

- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — sign in
- `GET /api/auth/me` — get the current account (Bearer token required)

### Returns (all require a Bearer token)

- `GET /api/returns` — list the signed-in user's records
- `POST /api/returns` — create a record
- `PATCH /api/returns/:id` — update a record
- `DELETE /api/returns/:id` — delete a record

## Important deployment notes

- Never commit `server/.env`, database credentials, or JWT secrets.
- For production, use a hosted MongoDB database, a strong unique JWT secret, HTTPS, and set `CLIENT_ORIGIN` to the deployed frontend origin.
- Configure the deployed frontend's `/api` proxy or API base URL to point to the deployed backend. The current Vite proxy is for local development only.
- This project has not been deployed by this repository setup. Verify the app locally before deploying.

## Project structure

```text
ReturnIQ/
  client/       React + Vite frontend
  server/       Express API, authentication, Mongoose models
  README.md
  .gitignore
```
