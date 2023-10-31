require("dotenv").config();
const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const flash = require("connect-flash")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const Inventory = require("./models/inventory");

const app = express();

app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log("DB connection successful"))
  .catch(err => console.log(err));

app.use(session({
  secret: "abc",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    autoRemove: 'interval',
    autoRemoveInterval: 1
  })
}))

app.use(flash({ single: true }));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success")
  res.locals.error_msg = req.flash("error")
  next()
})

app.use((req, res, next) => {
  const cart = req.session.cart;
  res.locals.cart = cart;
  next()
})


app.get("/", (req, res) => {
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
      res.render("homepage", {
        Inventories: products,
        activeTab: 'shop'
      })
    })
    .catch(err => console.log(err));
})


app.use("/shop", require("./route/shop"))
app.use("/cart/", require("./route/add-to-cart"))
app.use("/view-cart", require("./route/view-cart"))
app.use("/checkout", require("./route/checkout"))
app.use("/login", require("./route/login"))

app.get("/about", (req, res) => {
  res.render("aboutUs", { activeTab: 'about' })
})

app.get("/services", (req, res) => {
  res.render("services", { activeTab: 'services' })
})

app.get("/blog", (req, res) => {
  res.render("blog", { activeTab: 'blog' })
})

app.get("/contact", (req, res) => {
  res.render("contactUs", { activeTab: 'contact' })
})


app.get("/cart", (req, res) => {
  res.render("cart")
})


app.get("/thankyou", (req, res) => {
  res.render("thankyou")
})




// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});