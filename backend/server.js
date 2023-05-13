import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { notFound, errorHandler } from "./middlware/errorMiddleware.js";
import morgan from "morgan";
const app = express();
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
connectDB();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname , 'front-end','build','index.html')));
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
