// orderController.js
import mongoose from "mongoose";
import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const { products, amount } = req.body;
    console.log(products, amount);
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const order = await Order.create({
      user: userExists._id,
      products,
      amount,
    });
    console.log(order);

    res.status(201).json({ order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userData.userId;

    const userOrders = await Order.find({ user: userId });

    res.status(200).json({ userOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate("user");

    res.status(200).json({ allOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = newStatus;
    await order.save();
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.error("Error changing order status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
