import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      // Only keep necessary options for MongoDB Atlas
      retryWrites: true,
      w: "majority",
    });
    console.log("MongoDB Atlas connected successfully...");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
