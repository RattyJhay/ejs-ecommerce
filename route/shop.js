const { Router } = require("express")
const router = Router()
const Inventory = require("../models/inventory");


router.get("/", async (req, res) => {
  try {
    const foundItems = await Inventory.find({});

    if (foundItems.length === 0 || foundItems === undefined) {
      console.log("top items ===>", foundItems)
      return res.render("shop", {
        activeTab: 'shop',
        Inventories: [],
      });
    } else {
      return res.render("shop", {
        Inventories: foundItems,
        activeTab: 'shop'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
})




module.exports = router;