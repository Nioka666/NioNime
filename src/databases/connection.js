import mongoose from "mongoose";
import { greenBold, redBold } from "../utils/fxFactories.js";

export const Conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://nioka666:nioka666@nionime.sjcjmif.mongodb.net/NioNime");

    console.log(greenBold("Connected to MongoDB Atlas"));
  } catch (err) {
    console.error(redBold(`Error connecting to MongoDB Atlas: ${err.message}`));
    throw err;
  }
};
