const { Router } = require("express")
const bcrypt = require("bcryptjs")
const router = Router()
const Inventory = require("../models/inventory");
const Order = require("../models/order");
const User = require("../models/user");
const order = require("../models/order");
const saltRounds = 10;

function prepareOrder(cart, returningUser) {
  // console.log(cart)
  for (let i = 0; i <= cart.length; i++) {
    Inventory.find({ _id: cart[i]._id })
      .then(result => {
        if (result) {
          if (returningUser) {
            const newOrder = new Order({
              // userId: 
            })
          }
          // console.log("found id")
        } else {
          console.log("couldn't find id")
        }
      })
      .catch(err => console.log(err))
  }

  // console.log("done")

}

router.get("/", (req, res) => {
  res.render("checkout")
})


router.post("/", async (req, res) => {
  const errors = req.flash("error");
  let returningUser = false;
  let differentAddress = false;
  const { country, fname, lname, paymentMethod, address, state_country, postal_zip, email_address, phone, createAccount, account_password, diff_fname, diff_lname, diff_paymentMethod, diff_address, diff_state_country, diff_postal_zip, diff_phone, order_notes, ship_different_address, diff_email_address, diff_country } = req.body;

  if (!email_address || !phone || !address || !fname || !lname || !country || !paymentMethod || !postal_zip) {
    errors.push("Please fill in all the necessary fields")
  }

  if (createAccount && createAccount === "1") {
    if (!(account_password.length >= 6)) {
      errors.push("Password must be at least 6 characters");
      returningUser = false
    } else {
      returningUser = true;
    }
  }

  if (ship_different_address && ship_different_address === "1") {
    if (!diff_fname || !diff_lname || !diff_paymentMethod || !diff_address || !diff_state_country || !diff_phone || !diff_postal_zip || !diff_email_address || !diff_country) {
      errors.push("Please fill in all the shipment address field")
    } else {
      differentAddress = true;
    }
  }

  if (res.headersSent) {
    return;
  }


  if (errors.length > 0) {
    res.render("checkout", {
      email_address,
      fname,
      lname,
      paymentMethod,
      address,
      phone,
      country,
      createAccount,
      account_password,
      postal_zip,
      errors: errors
    })
  } else {
    if (returningUser) {
      try {
        const user = await User.findOne({ email: email_address });
        if (user) {
          // user exist
          errors.push("Email already exist, login to continue or change email");
          res.render("checkout", {
            email_address,
            fname,
            lname,
            paymentMethod,
            address,
            phone,
            country,
            createAccount,
            account_password,
            postal_zip,
            errors: errors,
          });
        } else {
          const hashedPassword = await bcrypt.hash(account_password, saltRounds);
          let total = 0;
          let cart = req.session.cart;


          const newUser = new User({
            email: email_address,
            name: {
              firstName: fname,
              lastName: lname,
            },
            country: country,
            phoneNumber: phone,
            password: hashedPassword,
            billingAddress: {
              street_address_1: address,
              city_or_state: state_country,
              zipCode: postal_zip,
              country: country,
            },

          });

          if (differentAddress) {
            newUser.shippingAddress = {
              firstName: diff_fname,
              lastName: diff_lname,
              email: diff_email_address,
              phoneNumber: diff_phone,
              paymentMethod: diff_paymentMethod,
              streetAddress: diff_address,
              city_or_state: diff_state_country,
              postalCode: diff_postal_zip,
              country: diff_country
            }
          }

          await newUser.save();


          User.findOne({ email: email_address })
            .then(user => {
              if (user) {
                if (cart && cart.length > 0) {
                  const newOrder = new Order({
                    email: email_address,
                    PaymentMethod: paymentMethod,
                    products: [],
                    billingAddress: {
                      firstName: fname,
                      lastName: lname,
                      street_address_1: address,
                      city_or_state: state_country,
                      zipCode: postal_zip,
                      country: country,
                    },
                    couponCode: "",
                    orderNote: order_notes,
                    status: "processing",
                  })

                  if (differentAddress) {
                    newOrder.shippingAddress = {
                      firstName: diff_fname,
                      lastName: diff_lname,
                      email: diff_email_address,
                      phoneNumber: diff_phone,
                      paymentMethod: diff_paymentMethod,
                      streetAddress: diff_address,
                      city_or_state: diff_state_country,
                      postalCode: diff_postal_zip,
                      country: diff_country
                    }
                  }

                  const promises = cart.map(cartItem => {
                    return Inventory.findById(cartItem._id).exec()
                  })

                  Promise.all(promises)
                    .then(inventoryItems => {
                      inventoryItems.forEach((inventoryItem, index) => {
                        if (inventoryItem) {
                          newOrder.products.push({
                            productId: inventoryItem._id,
                            quantity: cart[index].quantity
                          })
                          let sub = parseFloat(inventoryItem.total).toFixed(2);
                          total += +sub;
                        } else {
                          console.log(`Couldn't find inventory item with ID ${cart[index]._id}`)
                        }
                      })

                      newOrder.cartSubtotal = total;
                      newOrder.totalPrice = total;

                      newOrder.save()
                        .then(() => {
                          console.log("Order saved")
                          req.flash("success", "Order saved");
                          res.redirect("/thankyou")
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err))
                }
                else {
                  req.flash("error", "Cart is empty")
                  res.redirect("/checkout");
                }

              } else {
                req.flash("error", "User doesn't exist");
                res.redirect("/checkout");
              }
            })


          // console.log(req.session.cart)
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!returningUser) {
      try {
        let cart = req.session.cart;
        let total = 0;

        if (cart && cart.length > 0) {
          const newOrder = new Order({
            userId: req.user ? req.user._id : null,
            email: email_address,
            PaymentMethod: paymentMethod,
            products: [],
            billingAddress: {
              firstName: fname,
              lastName: lname,
              street_address_1: address,
              city_or_state: state_country,
              zipCode: postal_zip,
              country: country,
            },
            couponCode: "",
            orderNote: order_notes,
            status: "processing",
          })

          if (differentAddress) {
            newOrder.shippingAddress = {
              firstName: diff_fname,
              lastName: diff_lname,
              email: diff_email_address,
              phoneNumber: diff_phone,
              paymentMethod: diff_paymentMethod,
              streetAddress: diff_address,
              city_or_state: diff_state_country,
              postalCode: diff_postal_zip,
              country: diff_country
            }
          }

          const productPromises = cart.map((cartItem) => {
            return Inventory.findById(cartItem._id)
              .then((product) => {
                if (product) {
                  newOrder.products.push({
                    productId: product._id,
                    quantity: cartItem.quantity
                  });
                  let sub = parseFloat(cartItem.total).toFixed(2);
                  total += +sub;
                }
              });
          });

          Promise.all(productPromises)
            .then(() => {
              newOrder.cartSubtotal = total;
              newOrder.totalPrice = total;
              return newOrder.save();
            })
            .then(() => {
              console.log("Order saved");
              req.flash("success", "Order saved");
              res.redirect("/thankyou");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          req.flash("error", "Cart is empty🛒");
          res.redirect("/checkout")
        }

      } catch (error) {
        console.log(error)
      }

    }
  }

})

module.exports = router;

