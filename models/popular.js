const mongoose = require("mongoose")

const PopularSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Inventory' },
      name: String,
      price: NumberDecimal(9.99),
      discription: String,
    }
  ]
})

module.exports = new mongoose.model("PopularProduct", PopularSchema)