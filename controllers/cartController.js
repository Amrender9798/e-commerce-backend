import Cart from "../models/cart.js";
import Product from "../models/product.js";

export async function getCart(req, res) {
  try {
    const userId = req.userData.userId;
    const cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "productName price images stockQuantity",
    });
    const response = {
      cartId: cart ? cart._id : null,
      cart: cart ? cart.products : [],
    };
    res.json(response);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addToCart(req, res) {
  try {
    console.log("I am in cart");
    const userId = req.userData.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    // Check product availability and get the original stock quantity
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock quantity" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      existingProduct.quantity = quantity;
    } else {
      // Otherwise, add the product to the cart with the original quantity
      cart.products.push({
        productId: product._id,
        quantity: quantity,
      });
    }

    // Save the updated cart
    await cart.save();
    console.log(cart);
    res.json(cart.products);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const userId = req.userData.userId;
    const productId = req.body.productId;

    // Remove the product from the cart
    const product = await Product.findById(productId);
    await Cart.updateOne(
      { userId },
      { $pull: { products: { productId: product._id } } }
    );

    res.json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function emptyCart(req, res) {
  try {
    const userId = req.userData.userId;
    await Cart.findOneAndDelete({ userId });
    res.json({ success: true, message: "Cart is empty now" });
  } catch (error) {
    console.error(`Error removing cart: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
