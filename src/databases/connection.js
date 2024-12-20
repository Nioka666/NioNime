import mongoose from "mongoose";
import { greenBold, redBold } from "../utils/fxFactories.js";
import { DB_PASS } from "../utils/environment.js";

export const Conn = async () => {
  try {
    await mongoose.connect(`mongodb+srv://nioka666:${DB_PASS}@nionime.sjcjmif.mongodb.net/NioNime`, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(greenBold("Connected to MongoDB Atlas"));
  } catch (err) {
    console.error(redBold(`Error connecting to MongoDB Atlas: ${err.message}`));
    throw err;
  }

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(redBold('MongoDB Atlas connection disconnected through app termination'));
      process.exit(0);
    });
  });
};
