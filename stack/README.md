## MERN Flight Booking Management (CRUD)

This project is a basic MERN stack CRUD app to manage **Flight Booking / Passenger details** with fields:

- Passenger name
- From
- To
- Date
- Departure date
- Arrival date
- Phone number (used as the **unique key** for search/update/delete)
- Email ID

### Tech used

- **MongoDB**: database
- **Express + Node.js**: REST API
- **React (Vite)**: frontend UI

## Steps taken (what was built)

- **Created backend** in `server/`
  - Mongoose model: `server/src/models/Passenger.js`
  - CRUD routes: `server/src/routes/passengers.js`
  - Server bootstrap: `server/src/index.js`
- **Created frontend** in `client/`
  - Form to insert passenger details
  - Search by phone number to load a record into the form
  - Update by phone number
  - Delete by phone number
  - Table view of all records
- **Configured dev proxy** so the React app can call the API using `/api/*`
  - `client/vite.config.js` proxies `/api` → `http://localhost:5000`

## API endpoints

- **Insert**: `POST /api/passengers`
- **View all**: `GET /api/passengers`
- **Search by phone**: `GET /api/passengers/:phoneNumber`
- **Update by phone**: `PUT /api/passengers/:phoneNumber`
- **Delete by phone**: `DELETE /api/passengers/:phoneNumber`

## How to run (Windows)

### 1) Start MongoDB

Use *either* MongoDB Community Server locally, or MongoDB Atlas.

**Local MongoDB** example connection string (already in `server/.env` by default):

- `mongodb://127.0.0.1:27017/flight_management`

### 2) Configure backend env

In `server/`, copy `.env.example` to `.env` (already done by the setup) and edit if needed:

- `MONGODB_URI=...`
- `PORT=5000`

### 3) Run the backend

```bash
cd server
npm run dev
```

Backend health check:

- `GET http://localhost:5000/api/health`

### 4) Run the frontend

```bash
cd client
npm run dev
```

Open the URL shown by Vite (typically `http://localhost:5173`).

