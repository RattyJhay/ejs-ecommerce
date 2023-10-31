const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // make the field optional
  },
  email: String,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'
      },
      quantity: Number
    }
  ],
  PaymentMethod: String,
  cartSubtotal: mongoose.Decimal128,
  totalPrice: mongoose.Decimal128,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    paymentMethod: String,
    streetAddress: String,
    city_or_state: String,
    postalCode: String,
    country: String
  },
  billingAddress: {
    streetAddress: String,
    city_or_state: String,
    state: String,
    postalCode: String,
    country: String
  },
  couponCode: { type: String, default: "" },
  orderNote: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});


module.exports = new mongoose.model("Order", OrderSchema)