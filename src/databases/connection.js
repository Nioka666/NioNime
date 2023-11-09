import mongoose from "mongoose";

export const Conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://nioka666:nioka666@nionime.sjcjmif.mongodb.net/NioNime");

    // console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err.message);
    throw err;
  }
};
