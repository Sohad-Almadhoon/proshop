import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
  getTopRatedProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middlware/authMiddleware.js";
const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopRatedProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, editProduct);
export default router;
