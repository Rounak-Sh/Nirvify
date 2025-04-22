import express from "express";
import {
  signup,
  login,
  logout,
  getUsers,
  deleteUser,
} from "../controller/userController.js";

const userRoutes = express.Router();

// Signup route
userRoutes.post("/signup", signup);

// Login route
userRoutes.post("/login", login);

// Logout route
userRoutes.get("/logout", logout);

// Fetch all users
userRoutes.get("/users", getUsers);

// Delete user by ID
userRoutes.delete("/users/:id", deleteUser);

export default userRoutes;
