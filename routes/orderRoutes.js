import express from "express";
import {
    changeStatus,
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/orderController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/create",authenticate, createOrder);
router.get("/", authenticate, getUserOrders);
router.get("/all", getAllOrders);
router.put("/change-status",changeStatus);

export default router;
