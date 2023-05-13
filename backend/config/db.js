import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo :${conn.connection.host}`);
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
};
export default connectDB;