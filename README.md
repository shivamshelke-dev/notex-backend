# 🚀 NoteX Backend

Backend API for **NoteX – Your Digital Notebook**.  
Built with **Node.js, Express, MongoDB, JWT Authentication**.

This server handles:

- User Authentication (Register / Login)
- JWT Token Generation & Verification
- Notes CRUD Operations
- Move Notes to Trash
- Secure Protected Routes
- Production Deployment (Render Ready)

---

## 🌐 Live API (Production)

https://notex-backend-gyso.onrender.com

> ⚠️ Backend hosted on Render free tier. Initial request may take ~30 - 50 seconds due to cold start

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- CORS
- dotenv

---

## 📦 Project Structure

```
notex-backend/
│
├── controllers/
│   ├── authController.js
│   └── noteController.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── server.js
├── package.json
└── .env (not pushed to GitHub)
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

⚠️ Never push `.env` to GitHub. Add it to `.gitignore`.

---

## ⚙️ Installation (For Local Setup)

### 1️⃣ Clone the repository

```
git clone https://github.com/shivamshelke-dev/notex-backend.git
cd notex-backend
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Create `.env` file (as shown above)

### 4️⃣ Start server

```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🔑 Authentication Endpoints

### Register User

POST `/api/auth/register`

```
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

---

### Login User

POST `/api/auth/login`

```
{
  "email": "test@example.com",
  "password": "123456"
}
```

Response:

```
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

---

## 📝 Notes Endpoints (Protected)

Requires Header:

```
Authorization: Bearer YOUR_TOKEN
```

### Create Note
POST `/api/notes`

### Get All Notes
GET `/api/notes`

### Update Note
PUT `/api/notes/:id`

### Delete Note
DELETE `/api/notes/:id`

---

## 🚀 Deployment

Backend deployed on **Render**.

Production settings:

- Build Command: `npm install`
- Start Command: `node server.js`
- Environment Variables added in Render dashboard
- CORS configured for Vercel frontend

---

## 🧠 Author

**Bapu Shelke**  
Full Stack Developer  
Pune, India 🇮🇳

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
