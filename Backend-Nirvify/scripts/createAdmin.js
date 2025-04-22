import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import { User } from "../models/userModel.js";

const createAdminUser = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });

    console.log("Connected to MongoDB Atlas successfully...");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@nirvify.com" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Hash the password using bcrypt (same as in userController)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    // Create new admin user
    const newAdmin = new User({
      username: "Admin",
      email: "admin@nirvify.com",
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
    process.exit(0);
  }
};

createAdminUser();
