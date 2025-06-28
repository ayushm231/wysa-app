# 🧠 Wysa Sleep App - Backend Assignment

This is the backend implementation for the Wysa Sleep App onboarding experience using **Node.js**, **Express**, and **MongoDB**. It supports user authentication, onboarding flow management, analytics, and is scalable for future onboarding screen additions.

---

## 🚀 Tech Stack

- **Node.js** + **Express**
- **MongoDB Atlas** + Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing

---

## 📂 Folder Structure

```
.
├── controllers/       # Logic for auth and onboarding
├── middleware/        # JWT auth middleware
├── models/            # Mongoose schemas
├── routes/            # API routes
├── public/            # Signup HTML page
├── .env               # Environment config file
├── index.js           # Entry point
```

---

## 🔐 Authentication

- **POST /api/auth/signup**: Register with nickname + password
- **POST /api/auth/login**: Login and receive JWT

---

## 📝 Onboarding APIs

| Method | Endpoint                        | Description                          |
| ------ | ------------------------------- | ------------------------------------ |
| POST   | `/api/onboarding/screen:screen` | Submit answer for a given screen     |
| GET    | `/api/onboarding/screen:screen` | Get user's answer for a given screen |
| GET    | `/api/onboarding/all`           | Get all onboarding answers           |
| GET    | `/api/onboarding/dropoff-stats` | Get drop-off stats (analytics)       |

- All onboarding routes are protected via `Authorization: Bearer <token>`

---

## 🧪 Admin / Utility APIs

| Method | Endpoint          | Description                              |
| ------ | ----------------- | ---------------------------------------- |
| GET    | `/api/auth/users` | Get all registered users (auth required) |

---

## 🧾 Signup UI (Bonus)

A simple frontend signup form is available at:

```
GET /index.html
```

> Located inside `/public`, this page lets users create an account via a minimal HTML + JavaScript interface.

---

## 🎯 Bonus Features Implemented

- ✅ Streamlined storage for analytics (`Map<String, String>` + `completedScreens`)
- ✅ JWT-based auth and protected APIs
- ✅ Minimal HTML UI for signup
- ✅ Analytics API for screen drop-offs
- ✅ Dynamic onboarding (no hardcoded screens)

---

## 🔧 Setup Instructions

### 1. Clone the repo & install dependencies

```bash
git clone https://github.com/ayushm231/wysa-sleep-backend.git
cd wysa-sleep-backend
npm install
```

### 2. Create `.env` file

```env
PORT=5000
MONGO_URI={somevalue}
JWT_SECRET={somevalue}
```

### 3. Run the app

```bash
npm run dev
```

> Visit: `http://localhost:5000/index.html`

---

## ✅ Status

All core and bonus requirements are complete. The API is fully tested and working locally.

---

## 📧 Contact

**Ayush Mishra**  
📧 ayushm78987@gmail.com
🌐 [Portfolio](https://ayush-mishra-portfolio.vercel.app)  
🔗 [LinkedIn](https://www.linkedin.com/in/ayushmishra231)
