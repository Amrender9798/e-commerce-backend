import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectToDatabase from "./db/connection.js";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authenticate from "./middlewares/authenticate.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/authRoutes.js";
import personalInfoRouter from "./routes/personalInfoRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const uploadsPath = path.join("uploads");
app.use("/uploads", express.static(uploadsPath));

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", authenticate, cartRouter);
app.use("/reviews", reviewRouter);
app.use("/orders", authenticate, orderRouter);
app.use("/personal-info",authenticate,personalInfoRouter);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  connectToDatabase();
});
