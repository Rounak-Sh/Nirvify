import express from "express";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";
import episodeRoutes from "./routes/episodeRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Database & Cloudinary connections
connectDB();
connectCloudinary();

// CORS configuration with explicit origins for Vercel deployment
const allowedOrigins = [
  "http://localhost:5173",
  "https://nirvify.onrender.com",
  "https://nirvify.vercel.app",
  "https://nirvify-git-main-rounaqsh-gmailcoms-projects.vercel.app",
  "https://nirvify-kun98qj19-rounaqsh-gmailcoms-projects.vercel.app",
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/auth", userRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/episode", episodeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}...`);
});
