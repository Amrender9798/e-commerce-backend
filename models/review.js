import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

export default Review;
