import mongoose from "mongoose";

let productSchema = new mongoose.Schema(
  {
    // userRef: { type: String, required: true, },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "uncategorized" },
    imageUrls: { type: Array, required: true },
  },
  { timestamps: true }
);

export let Product = mongoose.model("Product", productSchema);
