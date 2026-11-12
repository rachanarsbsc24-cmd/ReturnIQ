# ReturnIQ — Return Intelligence Platform

ReturnIQ is a web-based E-Commerce Product Returns Management and Analytics Platform developed using React.js, Node.js, Express.js, and MongoDB.

The application allows users to manage product return records, monitor return statuses, explore return analytics, and securely access their data through account authentication.

## Features

### 1. Dashboard
- Dashboard overview with return summary cards.
- Total returns, pending returns, approved returns, and rejected returns.
- Recent return activity.
- Return aging monitoring.

### 2. Return Management
- Create new return records.
- View existing return records.
- Update return information and status.
- Delete return records.
- Manage product, customer, category, reason, date, and status information.

### 3. Analytics
- Return reason breakdown.
- Product and category insights.
- Return status analysis.
- Advanced analytics dashboard.

### 4. User Authentication
- User registration.
- Email and password login.
- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected API routes.
- User-specific return records.

### 5. Backend and Database
- REST API developed using Express.js.
- MongoDB database integration.
- Mongoose schemas and models.
- Persistent storage of user accounts and return records.
- User-specific data access.

### 6. API Security
- Helmet security headers.
- CORS configuration.
- JSON request size limits.
- Authentication rate limiting.
- JWT verification middleware.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | bcryptjs |
| API Communication | REST API |
| Development Tools | Visual Studio Code, Git, GitHub |
| Database Tool | MongoDB Compass |

## Project Requirements

- Windows 10/11, macOS, or Linux.
- Node.js and npm.
- MongoDB Community Server or a MongoDB connection URI.
- Visual Studio Code or another code editor.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rachanarsbsc24-cmd/ReturnIQ.git
cd ReturnIQ
```

### 2. Configure the Backend

Navigate to the server directory:

```powershell
cd server
npm install
```

Create an environment file:

```powershell
Copy-Item .env.example .env
```

Open `server/.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/returniq
JWT_SECRET=your-generated-secret
CLIENT_ORIGIN=http://localhost:5173
```

Generate a secure JWT secret using:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Replace `your-generated-secret` with the generated value.

**Important:** Never upload your `.env` file, database credentials, or JWT secrets to GitHub.

### 3. Start the Backend

From the `server` directory:

```powershell
npm run dev
```

The backend runs at:

`http://localhost:5000`

API health endpoint:

`http://localhost:5000/api/health`

### 4. Configure and Start the Frontend

Open a second terminal in the project root:

```powershell
cd client
npm install
npm run dev
```

Open the frontend at:

`http://localhost:5173`

The Vite development server forwards `/api` requests to the Express backend running on port 5000.

## Database Structure

ReturnIQ uses MongoDB for persistent data storage and Mongoose for database interaction.

**Database name:** `returniq`

**Collections:**

| Collection | Purpose |
|---|---|
| users | Stores registered user account information |
| returns | Stores product return records associated with users |

### Mongoose Models

- `User.js` – Defines the user account schema.
- `Return.js` – Defines the product return schema.

MongoDB Compass can be used to view and manage the local database.

Local MongoDB connection:

`mongodb://127.0.0.1:27017`

## API Documentation

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Retrieve the authenticated user's information |

### Return Management Routes

All return routes require a valid JWT Bearer token.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/returns` | Retrieve the signed-in user's return records |
| POST | `/api/returns` | Create a new return record |
| PATCH | `/api/returns/:id` | Update an existing return record |
| DELETE | `/api/returns/:id` | Delete a return record |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check API availability |

## Application Testing

The following workflows can be tested in the local development environment:

1. Register a new user account.
2. Sign in using registered credentials.
3. View the dashboard and return summaries.
4. Add a new product return.
5. Update an existing return record.
6. Delete a return record.
7. Refresh the application and verify database persistence.
8. Sign out and sign in again.
9. Register another account and verify that return records are isolated between users.

## Project Structure

```text
ReturnIQ/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AdvancedAnalytics.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductIssues.jsx
│   │   │   ├── ReasonBreakdown.jsx
│   │   │   ├── ReturnAgingMonitor.jsx
│   │   │   ├── ReturnForm.jsx
│   │   │   ├── ReturnTable.jsx
│   │   │   └── SummaryCard.jsx
│   │   │
│   │   ├── data/
│   │   │   └── mockReturns.js
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Return.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── returns.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore
```

## Deployment Status

The project has been configured for local development and GitHub version control.

Cloud deployment using MongoDB Atlas and Render has been attempted but requires further connection configuration and verification.

The current Vite proxy is intended for local development. Production deployment requires separate frontend and backend configuration.

## Future Enhancements

- Complete cloud deployment.
- Enhanced return trend analysis.
- Additional reporting and visualization features.
- Improved user and administrator management.
- Further performance and scalability improvements.

## Conclusion

ReturnIQ combines a React-based dashboard with an Express REST API, MongoDB persistence, and JWT-based authentication to provide a structured platform for managing and analyzing e-commerce product returns.

The project demonstrates full-stack web development, database integration, API development, and user authentication.

## Author

Developed as an academic project.

