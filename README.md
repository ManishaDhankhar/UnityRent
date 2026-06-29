<p align="center">
  <h1 align="center">🏠 UnityRent</h1>
  <p align="center"><em>Turn Hostel Clutter into Campus Currency</em></p>
  <p align="center">
    <img src="https://img.shields.io/badge/Platform-Web-brightgreen" />
    <img src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel" />
    <img src="https://img.shields.io/badge/License-MIT-blue" />
  </p>
</p>

---

🔗 **Live Demo:** [unity-rent-backend.vercel.app](https://unity-rent-backend.vercel.app)

---

## 📌 Table of Contents

- [About](#-about)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Target Users](#-target-users)
- [Roadmap](#️-roadmap)
- [Team](#-team)

---

## 📖 About

**UnityRent** is a hyper-local, peer-to-peer (P2P) rental marketplace built exclusively for university campuses and student societies. It connects students who have underutilized belongings — cameras, textbooks, cycles, lab equipment, sports gear — with fellow students who need them for a short period.

Instead of buying something they'll use once or twice, students can rent it from someone three hostels away. Instead of letting expensive items gather dust, owners earn passive income right from their room.

> *UnityRent turns "hostel clutter" into a passive income stream.*

---

## ❗ The Problem

- Students frequently need items for **short durations** (cameras for a trip, textbooks for one semester, formal wear for a single event)
- Buying outright is expensive; returning second-hand items is uncertain
- There is **no trusted, campus-specific platform** for peer-to-peer rentals
- Off-campus rental services lack the proximity, trust, and affordability that student communities need

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📋 **Item Listings** | Post any item for rent with photos, price per day, and availability |
| 🔍 **Browse & Search** | Discover available items filtered by category, price, or campus location |
| 🔐 **User Authentication** | Secure signup and login for verified campus members |
| 📅 **Booking System** | Request rental periods and manage booking confirmations |
| 👤 **User Profiles** | Track your own listings, active rentals, and rental history |
| ⭐ **Trust & Ratings** | Review system to build credibility between renters and owners |
| 📸 **Image Uploads** | Upload item photos for better listing visibility |
| 📱 **Responsive UI** | Works seamlessly across mobile, tablet, and desktop |

---

## 🔄 How It Works

```
1. SIGN UP      →  Register with your campus email
2. LIST ITEM    →  Post what you want to rent out (photo + price/day)
3. BROWSE       →  Find what you need from fellow students nearby
4. BOOK         →  Request the item for your required dates
5. RENT & EARN  →  Owner confirms → item is handed off → owner earns
6. REVIEW       →  Both parties rate the experience
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, CSS, HTML |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Mongoose) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Image Storage** | Cloudinary / Multer |
| **Deployment** | Vercel (Frontend + Backend) |
| **Language** | JavaScript (95%), CSS (4%), HTML (1%) |

---

## 📁 Project Structure

```
UnityRent/
│
├── Backend/
│   ├── controllers/        # Logic for users, listings, bookings, reviews
│   ├── models/             # Mongoose schemas (User, Item, Booking, Review)
│   ├── routes/             # Express API routes
│   ├── middleware/         # JWT auth middleware, error handlers
│   ├── utils/              # Helper functions
│   ├── .env                # Environment variables (DO NOT commit)
│   ├── app.js              # Express app entry point
│   └── package.json
│
├── Frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Cards, Forms)
│   │   ├── pages/          # Home, Listings, Profile, Booking, Login
│   │   ├── services/       # API call functions (axios)
│   │   ├── context/        # Auth context / global state
│   │   └── App.js          # Root React component
│   └── package.json
│
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

---

### 1. Clone the Repository

```bash
git clone https://github.com/devikasharma1234/UnityRent..git
cd UnityRent.
```

---

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/` (see [Environment Variables](#-environment-variables) below).

```bash
node app.js
# or with nodemon:
npx nodemon app.js
```

Backend runs at: `http://localhost:5000`

---

### 3. Set Up the Frontend

```bash
cd ../Frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔑 Environment Variables

Create a `.env` file inside the `Backend/` directory:

```env
# MongoDB
MONGO_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Server
PORT=5000
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/items` | Get all available listings |
| `POST` | `/api/items` | Create a new listing (auth required) |
| `GET` | `/api/items/:id` | Get a single listing's details |
| `PUT` | `/api/items/:id` | Update a listing (owner only) |
| `DELETE` | `/api/items/:id` | Delete a listing (owner only) |
| `POST` | `/api/bookings` | Request a rental booking |
| `GET` | `/api/bookings/me` | Get current user's bookings |
| `POST` | `/api/reviews/:itemId` | Leave a review on a listing |

---

## 👥 Target Users

| User | Use Case |
|---|---|
| 🎒 **Students (Renters)** | Borrow items for short durations at low cost |
| 🏠 **Students (Owners)** | Monetize unused belongings from their hostel room |
| 🏫 **Campus Societies** | Share equipment (DSLRs, mics, projectors) within clubs |
| 🏗️ **New Students** | Access essentials without buying everything from scratch |

---

## 🗺️ Roadmap

- [x] User authentication (JWT)
- [x] Item listing with image uploads
- [x] Browse and search listings
- [x] Booking request system
- [x] User profiles and listing management
- [x] Review and rating system
- [x] Deployed on Vercel
- [ ] In-app chat between renter and owner
- [ ] Payment gateway integration (UPI / Razorpay)
- [ ] Email/SMS notifications for booking updates
- [ ] Mobile app (React Native)
- [ ] Campus verification via institute email

---

## 👤 Team

Built with ❤️ by:

- **Devika Sharma** — [github.com/devikasharma1234](https://github.com/devikasharma1234)
- **Manisha Dhankhar** — [github.com/ManishaDhankhar](https://github.com/ManishaDhankhar)
- **Gavy** - [github.com/Gavy2006](https://github.com/Gavy2006)

---

## 📄 License

This project is licensed under the **MIT License**.

---

> *"Why buy it when your batchmate has it? UnityRent — the campus economy, simplified."*
