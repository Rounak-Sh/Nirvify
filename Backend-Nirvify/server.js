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

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/auth", userRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/episode", episodeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}...`);
});
