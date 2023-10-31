const { Router } = require("express")
const router = Router()
const Inventory = require("../models/inventory");

function calculateTotal(item) {
  let price = item.price;
  if (typeof price === 'object') {
    price = price['$numberDecimal'];
  }
  item.total = parseFloat(price * item.quantity).toFixed(2);
}

router.post("/add", (req, res) => {
  const productId = req.body.productId
  Inventory.findById({ _id: productId })
    .then(foundItem => {
      if (!foundItem) {
        req.flash("failure", "Couldn't add item to cart");
        redirect("/shop")
      } else {
        return foundItem
      }
    })
    .then(product => {
      if (typeof req.session.cart === 'undefined') {
        req.session.cart = [];
        req.session.cart.push({
          _id: req.body.productId,
          name: product.productName,
          price: product.price,
          quantity: 1,
          total: product.price.toString(),
          image: product.image,
        })
      } else {
        let cart = req.session.cart, newItem = true;

        for (let i = 0; i < cart.length; i++) {
          if (cart[i]._id === req.body.productId) {
            req.session.cart[i].quantity++;

            calculateTotal(req.session.cart[i]);
            newItem = false;
            break;
          }
        }

        if (newItem) {
          cart.push({
            _id: req.body.productId,
            name: product.productName,
            price: product.price.toString(),
            quantity: 1,
            total: product.price.toString(),
            image: product.image
          })
        }

      }
      // console.log(req.session.cart)
      req.flash("success", "Item added to cart successfully");
      res.redirect("/shop");
    })
    .catch(err => console.log(err))
})


router.post("/update-cart", (req, res) => {
  const { quantity, productId } = req.body;
  let cart = req.session.cart;

  if (productId && quantity && cart) {
    // check if productId is an array or a string
    const productIdArr = Array.isArray(productId) ? productId : [productId];
    const quantityArr = Array.isArray(quantity) ? quantity : [quantity];

    for (let i = 0; i < productIdArr.length; i++) {
      for (let j = 0; j < cart.length; j++) {
        if (cart[j]._id === productIdArr[i]) {
          cart[j].quantity = quantityArr[i];
          calculateTotal(req.session.cart[j]);
          break;
        }
      }
    }

    req.flash("success", "Cart Updated");
  } else {
    req.flash("error", "Couldn't update cart 😔🛒");
  }

  res.redirect("/view-cart");
});


router.get("/remove-item/:product", (req, res) => {
  let productId = req.params.product;
  let cart = req.session.cart;
  let action = req.query.action;

  if (cart && cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === productId) {
        switch (action) {
          case "remove":
            cart.splice(i, 1);
            break;
          default:
            req.flash("error", "failed");
            break;
        }
        break;
      }
    }
  }

  req.flash("success", "One item removed from cart");
  res.redirect("/view-cart");
})

module.exports = router;