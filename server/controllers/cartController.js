// controllers/cartController.js
import { Cart } from "../models/cartModel.js"; // Assuming you have a Cart model
import { Product } from "../models/productsModel.js";
import { errorHandler } from "../utils/error.js";

// Add an item to the cart
export let addItemToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body; // Assuming userId is coming from the request body or token

  if (!userId || !productId || !quantity) {
    return next(
      errorHandler(400, "User ID, product ID, and quantity are required")
    );
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${productId} not found` });
    }

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // If cart exists, update the items
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        // If product already exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product does not exist, add a new item
        cart.items.push({ productId, quantity });
      }
    }

    // Save the updated cart
    await cart.save();
    res.status(201).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    next(error);
  }
};

// Controller function to handle fetching the cart data
export const getCart = async (req, res, next) => {
  try {
    // Get the userId from the authenticated user (req.user)
    const userId = req.user.id; // Assumes req.user is set by the authentication middleware

    // Fetch the cart for the authenticated user
    let cart = await Cart.findOne({ userId }).populate("items.productId"); // Populate the product details

    // If no cart is found for this user, return a 404 error
    if (!cart) {
      return next(errorHandler(404, "Cart not found")); // Use custom error handler
    }

    // Respond with a 200 OK status and the cart data
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message); // Log specific error message
    console.error("Error stack:", error.stack); // Log stack trace for debugging
    return next(errorHandler(500, "Server error while fetching cart data")); // Use custom error handler
  }
};

export let deleteCart = async (req, res, next) => {
  try {
    let userId = req.user.id;
    let { productId } = req.params;

    let cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
      return next(errorHandler(404, "cart not found"));
    }

    return res.status(200).json({ message: "cart successfully deleted" });
  } catch (error) {
    console.log("error deleting cart", error.message);
    return next(errorHandler(500, "server error while deleting the cart"));
  }
};
