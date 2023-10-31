const { Router } = require("express")
const router = Router()
const Inventory = require("../models/inventory");



router.get("/", (req, res) => {

  res.render("cart")
})


module.exports = router;