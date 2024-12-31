// Database connection Function for connecting to MongoDB

import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected`);
  } catch (error) {
    console.log(`mongodb connection error: ${error.message}`);
  }
};

export default databaseConnection;
