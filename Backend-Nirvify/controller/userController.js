import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For token generation
import { User } from "../models/userModel.js"; // Import User model

// Validations
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Handle user signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be 8+ chars, with 1 uppercase, 1 number, and 1 special character.",
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashpassword });

  await newUser.save();
  return res
    .status(201)
    .json({ status: true, message: "User registered successfully." });
};

// Handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User is not registered." });
  }

  const validpassword = await bcrypt.compare(password, user.password);
  if (!validpassword) {
    return res.status(401).json({ message: "Password is incorrect." });
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.KEY,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  const message =
    user.role === "admin" ? "Admin login successful" : "User login successful";
  res.json({ status: true, message, role: user.role });
};

// Handle user logout
const logout = (req, res) => {
  res.clearCookie("token"); // Clear authentication token
  return res.json({ status: true });
};

// Get a list of all users with the "user" role
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select(
      "username email role"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users." });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }
};

export { signup, login, logout, getUsers, deleteUser };
