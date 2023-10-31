const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }

  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: String,
  billingAddress: {
    street_address_1: {
      type: String,
      required: true
    },
    street_address_2: String,
    city_or_state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  shippingAddress: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: String,
    phoneNumber: {
      type: String,
    },
    paymentMethod: String,
    street_address_1: String,
    street_address_2: String,
    city_or_state: String,
    zipCode: String,
    country: String
  },
})

UserSchema.index({ email: 1 });

module.exports = new mongoose.model("User", UserSchema)