import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      // These options help with MongoDB Atlas connections
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Set retryWrites and w options for Atlas compatibility
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
