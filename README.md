# ReturnIQ — Return Intelligence Platform

ReturnIQ is a React dashboard for recording and analyzing e-commerce product returns. This project includes a Node.js/Express API, MongoDB persistence, and JWT-based account authentication.

## Features

- Dashboard overview and return-status summaries
- Create, edit, update status, and delete return records
- Search, filter, sort, and date-range filtering
- Return reason and product analytics
- CSV export, bulk actions, printable analytics, and overdue monitoring (where included in the frontend)
- MongoDB persistence instead of browser-only storage
- Account registration and sign-in
- Password hashing with bcrypt and signed JWT sessions
- Return records scoped to the signed-in account
- Basic API security headers, request size limits, CORS, and authentication rate limiting

## Requirements

- Windows 10/11, macOS, or Linux
- Node.js 20.19+ or 22.12+
- MongoDB Community Server running locally, or a MongoDB connection URI

## 1. Configure MongoDB and the API

Open a terminal in the project root.

Navigate to the server folder and create your environment file:

```powershell
cd server
Copy-Item .env.example .env
```

Open `server/.env` and configure the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/returniq
JWT_SECRET=your-generated-secret
CLIENT_ORIGIN=http://localhost:5173
```

Generate a secure JWT secret using PowerShell:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the generated value into `JWT_SECRET` in your `.env` file.

**Important:** Keep `.env` private. Never upload database credentials or JWT secrets to GitHub.

Install dependencies and start the backend:

```powershell
npm install
npm run dev
```

The API health endpoint is:

`http://localhost:5000/api/health`

### Check MongoDB on Windows

Check whether the MongoDB service is running:

```powershell
Get-Service MongoDB
```

If it is stopped, open PowerShell as Administrator and run:

```powershell
Start-Service MongoDB
```

## 2. Start the React frontend

Keep the backend terminal running. Open a second terminal in the project root:

```powershell
cd client
npm install
npm run dev
```

Open the Vite URL displayed in the terminal, normally:

`http://localhost:5173`

The Vite development server forwards `/api` requests to the backend at port 5000.

## 3. Create an account and test

1. Choose **Create an account** and register with a name, email, and password of at least 8 characters.
2. Sign in. On a new account, ReturnIQ inserts sample return records for the initial dashboard demonstration.
3. Add a return record, change its status, and delete a test record.
4. Refresh the browser to verify that saved records remain available in MongoDB.
5. Sign out and sign in again to verify authentication.
6. Register a second test account and confirm it cannot see the first account's return records.

MongoDB Compass can connect using:

`mongodb://127.0.0.1:27017`

The database is named `returniq`, with the `users` and `returns` collections.

## API Routes

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get the current account (Bearer token required) |

### Returns

All return routes require a valid Bearer token.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/returns` | List the signed-in user's records |
| POST | `/api/returns` | Create a return record |
| PATCH | `/api/returns/:id` | Update a return record |
| DELETE | `/api/returns/:id` | Delete a return record |

## Important Deployment Notes

- Never commit `server/.env`, database credentials, or JWT secrets.
- For production, use a hosted MongoDB database, a strong unique JWT secret, and HTTPS.
- Set `CLIENT_ORIGIN` to the deployed frontend's origin.
- Configure the deployed frontend's API base URL or backend routing to point to the deployed API.
- The current Vite proxy is intended for local development only.
- Deployment must be configured and tested separately before the application can be considered live.

## Project Structure

```text
ReturnIQ/
├── client/       # React + Vite frontend
├── server/       # Express API, authentication, Mongoose models
├── README.md
└── .gitignore
```

## Technologies Used

- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

