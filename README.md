# Nandini Waste Management Pvt. Ltd. — Full-Stack Portal

## 🌿 Overview
Production-grade corporate portal + employee management system for Nandini Waste Management Pvt. Ltd., India's emerging leader in Integrated Solid Waste Management since 2018.

---

## 📁 Project Structure

```
nandini-wms/
├── frontend/          # React + Vite + Tailwind
└── backend/           # Node.js + Express + MongoDB
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB Atlas or local MongoDB
- Cloudinary account (for media uploads)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/nandini_wms
JWT_SECRET=nandini_super_secret_2024
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
cd backend
node utils/seeder.js
```

### 4. Run Dev Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

---

## 👥 Default Login Credentials (After Seeding)

| Role         | Email                        | Password    |
|--------------|------------------------------|-------------|
| Super Admin  | admin@nandiniswm.com         | Admin@1234  |
| Manager      | manager@nandiniswm.com       | Manager@123 |
| Supervisor   | supervisor@nandiniswm.com    | Super@1234  |
| Employee     | employee@nandiniswm.com      | Emp@12345   |

---

## 🏗️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Redux Toolkit
- Framer Motion
- React Router DOM v6
- Axios
- Recharts

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary
- bcryptjs

---

## 📦 Deployment

### Backend (Railway / Render)
```bash
cd backend
npm start
```

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy /dist folder
```

---

## 📞 Company Contact
- Email: nandiniswm18@gmail.com
- Phone: +91-7903607816
- Address: C/O Manoj Kumar Vatsa, Nariyar, Kanti, Muzaffarpur (Bihar) – 843109
