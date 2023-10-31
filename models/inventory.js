const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({
  productName: String,
  discription: String,
  sku: {
    type: String,
    unique: true
  },
  price: {
    type: mongoose.Decimal128,
    currency: { type: String, default: "USD" }
  },
  quantity: Number,
  image: {
    type: String,
    required: true
  },
})

module.exports = new mongoose.model("Inventory", InventorySchema)

