import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";


const productRouter = express.Router();

// Public route to get all products
productRouter.get("/", getAllProducts);

// Public route to get a specific product by ID
productRouter.get("/:productId", getProductById);

// Protected route for creating a new product
productRouter.post("/", upload, authenticate, createProduct);

// Protected route for updating a product by ID
productRouter.put("/:productId", upload, authenticate, updateProductById);

// Protected route for deleting a product by ID
productRouter.delete("/:productId", authenticate, deleteProductById);

export default productRouter;
