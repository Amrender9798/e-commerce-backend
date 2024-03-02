import Product from "../models/product.js";
import Review from "../models/review.js";

// Controller method to get reviews for a specific product
export const getReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to add a new review
export const addReview = async (req, res) => {
  const { productId, reviewText, rating } = req.body;

  const newReview = new Review({
    productId,
    reviewText,
    rating,
    user: req.userData.userId,
  });

  try {
    const savedReview = await newReview.save();
    const product = await Product.findById(productId);
    product.rating.stars += rating;
    product.rating.users++;
    await product.save();
    res.json(savedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
