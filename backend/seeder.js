import mongoose from "mongoose";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

import dotenv from "dotenv";
import Order from "./models/orderModal.js";

dotenv.config();
connectDB();
const importedData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleProduct = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProduct);
    console.log("Data is imported successfully");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
const destoryData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    
    console.log("Data is Destroyed successfully");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
    destoryData();
} else {
    importedData();
}