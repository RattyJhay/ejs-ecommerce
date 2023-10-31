const { Router } = require("express")
const router = Router()
const Inventory = require("../models/inventory");


router.get("/", (req, res) => {
  Inventory.find({})
    .then(foundItems => {
      if (foundItems.length === 0) {
        return res.render("shop", {
          activeTab: 'shop'
        });
      } else {
        return foundItems;
      }
    })
    .then(products => {
      res.render("shop", {
        Inventories: products,
        activeTab: 'shop'
      })
    })
    .catch(err => console.log(err));
})


module.exports = router;