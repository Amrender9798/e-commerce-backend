import { Router } from "express";
import {
  addToCart,
  emptyCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = Router();

// Routes related to cart management
router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart);
router.delete("/empty",emptyCart);

export default router;
