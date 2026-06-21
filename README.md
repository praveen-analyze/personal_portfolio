# Praveen Kumar E — MERN Portfolio

A full-stack portfolio built with MongoDB, Express.js, React (Vite), Node.js & Tailwind CSS.

## Project Structure
```
portfolio/
├── backend/          # Node.js + Express + MongoDB
│   ├── models/Project.js
│   ├── routes/projects.js
│   └── server.js
└── frontend/         # React + Vite + Tailwind CSS
    └── src/
        ├── pages/Portfolio.jsx   ← Main portfolio page
        ├── pages/Admin.jsx       ← Admin panel (add/edit/delete projects)
        └── components/
            ├── Hero.jsx
            ├── Navbar.jsx
            ├── Skills.jsx
            ├── Projects.jsx      ← Fetches from MongoDB via API
            ├── Experience.jsx
            └── Contact.jsx
```

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
# Edit .env — set your MONGO_URI
npm run dev        # Runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
# Create .env file:  VITE_API_URL=http://localhost:5000/api
npm run dev        # Runs on http://localhost:5173
```

### 3. Seed Projects
Visit http://localhost:5173/admin → click **Seed Defaults** to load your 3 projects from MongoDB.

## Admin Panel
- Route: `/admin`
- Add / Edit / Delete projects
- Toggle Featured flag (shows "Featured" badge on card)
- Set display order
- Seed default projects from your resume with one click

## Deploy
- **Frontend** → Vercel (set VITE_API_URL env var to your Render backend URL)
- **Backend** → Render (set MONGO_URI to MongoDB Atlas connection string)
