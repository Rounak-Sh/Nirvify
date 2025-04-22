# Nirvify - Podcast Streaming Platform

![Nirvify Logo](Nirvify/src/assets/nirvify-logo.png)

Nirvify is a modern podcast streaming platform built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to listen to podcasts, browse episodes, and offers an admin interface for content management.

## 🌟 Features

- **User Authentication**: Secure login and signup functionality
- **Podcast Streaming**: Listen to podcasts with a full-featured audio player
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Admin Dashboard**: Manage podcasts, episodes, and users
- **Cloud Storage**: Media files stored in Cloudinary

## 🛠️ Tech Stack

### Frontend

- React with Vite
- TailwindCSS for styling
- React Router for navigation
- Axios for API requests
- HeroIcons for UI elements

### Backend

- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for media storage
- FFMPEG for audio processing

## 📋 Project Structure

```
Nirvify/
├── Frontend (Nirvify/)
│   ├── src/
│   │   ├── component/      # UI components
│   │   ├── pages/          # Page components
│   │   ├── playerLogic/    # Audio player functionality
│   │   ├── assets/         # Images and static assets
│   │   └── config/         # Configuration files
│   └── public/             # Public assets
│
└── Backend (Backend-Nirvify/)
    ├── config/             # Database and cloud configuration
    ├── controller/         # Route controllers
    ├── middleware/         # Express middleware
    ├── models/             # Database models
    └── routes/             # API routes
```

## 🚀 Live Demo

- Frontend: [https://nirvify.vercel.app](https://nirvify.vercel.app)
- Backend: [https://nirvify.onrender.com](https://nirvify.onrender.com)

## 💻 Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Git

### Installation

1. Clone the repository

   ```
   git clone https://github.com/Rounak-Sh/Nirvify.git
   cd Nirvify
   ```

2. Install frontend dependencies and start development server

   ```
   cd Nirvify
   npm install
   npm run dev
   ```

3. Install backend dependencies and start the server

   ```
   cd ../Backend-Nirvify
   npm install
   npm run server
   ```

4. Create a `.env` file in the Backend-Nirvify directory with the following variables:

   ```
   PORT = "3000"
   DB = "mongodb://your-mongodb-connection-string"
   KEY = "your-jwt-secret-key"
   CLOUDINARY_NAME = "your-cloudinary-name"
   CLOUDINARY_API_KEY = "your-cloudinary-api-key"
   CLOUDINARY_SECRET_KEY = "your-cloudinary-secret-key"
   ```

5. Create a `.env` file in the Nirvify directory with:
   ```
   VITE_API_URL=http://localhost:3000
   ```

## 👨‍💻 Admin Access

For admin access, use these credentials:

- Email: admin@nirvify.com
- Password: admin123

The admin panel allows you to:

- Add and manage podcasts
- Upload and edit episodes
- View and manage users

## 🌐 Deployment

### Frontend (Vercel)

1. Push your frontend code to GitHub
2. Connect your repository to Vercel
3. Set environment variable `VITE_API_URL` to your backend URL
4. Deploy!

### Backend (Render)

1. Push your backend code to GitHub
2. Create a new Web Service on Render
3. Set all required environment variables
4. Deploy with the build command `npm install` and start command `npm run server`

## 🙏 Acknowledgements

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
