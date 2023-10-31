const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
  productName: { type: Schema.Types.ObjectId, ref: 'Inventory' },
  discription: String,
  sku: String,
  price: {
    base: NumberDecimal(9.99),
    currency: { type: String, default: "USD" }
  },
  quantity: Number,
})

module.exports = new mongoose.model("Cart", CartSchema)