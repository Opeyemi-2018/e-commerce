import mongoose from "mongoose";

// Schema for individual items in a cart or order
const cartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: {  type: Number,  required: true,  default: 1 }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [cartItemSchema],
}, { timestamps: true });


// Schema for Order - Represents a completed order with multiple items and additional metadata
const orderSchema = new mongoose.Schema({
  customerId: {  type: mongoose.Schema.Types.ObjectId,  ref: 'User',  required: true },
  items: [cartItemSchema],  // Array of order items
  status: {  type: String,  enum: ['Pending', 'Shipped', 'Completed', 'Cancelled']},  // Enumeration for order statuses default: 'Pending' ,
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { 
    type: String, 
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],  // Enumeration for payment methods
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Failed'], 
    default: 'Pending' 
  }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Export models
export const Cart = mongoose.model('Cart', cartSchema);
export const Order = mongoose.model('Order', orderSchema);
