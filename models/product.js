import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  images: { type: String, required: true },
  rating: {
    stars: {
      type: Number,
      default: 5,
    },
    users: {
      type: Number,
      default: 1,
    },
  },
});

const Product = model("Product", productSchema);

export default Product;
