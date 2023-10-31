// Ecommerce Database Design

------ INVENTORY SCHEMA --------
-- product-name: String,
-- discription: String,
-- sku: String,
-- price: {
base: NumberDecimal(9.99),
currency: "USD"
},
-- quantity: Number,
-- image: {
filename: String,
format: String,
data: Buffer // Field to store the binary image data
}
------ USER SCHEMA ---------
-- \_id: {
type: String, // Use String data type for email address
required: true, // Make it required
unique: true // Ensure it is unique
}
-- firstName: String,
-- lastName: String,
-- phoneNumber: String,
-- billingAddress: {
street_address_1: String,
street_address_2: String,
city: String,
state: String,
zipCode: String,
country: String
},
-- shippingAddress: {
street_address_1: String,
street_address_2: String,
city: String,
state: String,
zipCode: String,
country: String
},
--------- ODER SCHEMA ----------
-- userId: ObjectId,
-- products: [
{
productId: ObjectId,
quantity: Number
}
],
-- Currency: USD,
-- Cart Subtotal: NumberDecimal(9.99),
-- totalPrice: NumberDecimal(9.99),
-- status: {
type: String,
enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
},
-- shippingAddress: Address, // Shipping address for the order
-- billingAddress: Address, // Billing address for the order
-- couponCode: String,  
 -- orderNote: String,
-- createdAt: Date,
-- updatedAt: Date

---------- CART SCHEMA -------------
-- userId: ObjectId,
-- products: [
{
productId: ObjectId,
quantity: Number,
price: NumberDecimal(9.99),
}
],
-- total

----------- POPULAR PRODUCT ------------
userId: ObjectId,
products: [
{
productId: ObjectId,
name: String,
price: NumberDecimal(9.99),
discription: String,
image: Buffer
}
]

Inventory.insertMany([

{
productName: "Nordic Chair",
discription: "The callback function is now the third parameter. When the update is successful, the author object returned contains the updated information.",
sku: "001",
price: mongoose.Types.Decimal128.fromString('160.00'),
quantity: 20,
image: "images/Product-img/product-1.png"
},
{
productName: "Armless Chair",
discription: "Armless swivel office chairs make it easier to get closer to your desk. In this case, the place where you’ll be resting your arms is the desk, so you can still maintain a neutral position for your arms, hands, and wrists.",
sku: "002",
price: mongoose.Types.Decimal128.fromString('260.00'),
quantity: 14,
image: "images/Product-img/product-2.png"
},
{
productName: "Kruzu Aero Chair",
discription: "Kruzu Aero chairs, or what is sometimes known as guest chairs, are stationary single person chairs that are located in waiting rooms or reception areas.",
sku: "003",
price: mongoose.Types.Decimal128.fromString('210.00'),
quantity: 30,
image: "images/Product-img/product-3.png"
},
{
productName: "ottoman Chair",
discription: "This piece traces its history back to the Ottoman Empire, where it used to be a centrepiece for seating in what we call the “living space” today. Over time it has become smaller and acts as more of a complementary furniture piece to the sofa.",
sku: "004",
price: mongoose.Types.Decimal128.fromString('390.00'),
quantity: 16,
image: "images/Product-img/product-4.png"
},
{
productName: "Loveseats Chair",
discription: "They can be bought as a set with other sofas or paired with another loveseat to save space. They come in an endless array of colors and designs so you can easily match them to the color scheme of a certain room.",
sku: "005",
price: mongoose.Types.Decimal128.fromString('230.00'),
quantity: 20,
image: "images/Product-img/product-5.png"
},
{
productName: "Convertible Chair",
discription: "Convertible chairs are, as their name implies, convertible to a variety of different types. These versatile pieces tend to feature foldable backs. If you’re tired of sitting, simply pop down the back to create a comfortable area to lay.",
sku: "006",
price: mongoose.Types.Decimal128.fromString('380.00'),
quantity: 20,
image: "images/Product-img/product-6.png"
},
{
productName: "Wood Chair",
discription: "These versatile pieces tend to feature foldable backs. If you’re tired of sitting, simply pop down the back to create a comfortable area to lay.",
sku: "007",
price: mongoose.Types.Decimal128.fromString('380.00'),
quantity: 20,
image: "images/Product-img/product-7.png"
},
{
productName: "Parsons Chair",
discription: "Select a parsons chair for a unique blend of style and functionality. A highlight of this type of accent furniture is how well it goes with just about anything. No matter your style of décor, there’s an option that’s perfect for you.",
sku: "008",
price: mongoose.Types.Decimal128.fromString('180.00'),
quantity: 17,
image: "images/Product-img/product-8.png"
},
{
productName: "Kristen Dimmable Pendant",
discription: "A streamlined dome shade and neutral tone give this pendant an understated, streamlined look for your space. Crafted from concrete, the dome shade features a sleek design and gray finish for a versatile minimalist design. ",
sku: "009",
price: mongoose.Types.Decimal128.fromString('150.00'),
quantity: 10,
image: "images/Product-img/product-9.png",
},
{
productName: "English Rolled Arm Chair",
discription: "Adding a touch of traditional design and incorporating a deeply cushioned, comforting spot to rest. English rolled arm chairs are iconically traditional and known for their rolled arms, deep, soft cushioning, and slightly angled back.",
sku: "010",
price: mongoose.Types.Decimal128.fromString('250.00'),
quantity: 23,
image: "images/Product-img/product-10.png"
},
{
productName: "Barrel Chair",
discription: "Comfort is key with this style of furniture. These pieces are created from the ground up with comfort in mind. Upholstery and plentiful padding make them a great place to sit and relax.",
sku: "011",
price: mongoose.Types.Decimal128.fromString('110.00'),
quantity: 19,
image: "images/Product-img/product-11.png"
},
{
productName: "Upholstered Chair",
discription: "Upholstered chairs are more difficult to clean and may need refinishing earlier than pure wood chairs. All fabrics are built differently, and you may find that upholstered chairs are more work in your space than a chair that is entirely wood.",
sku: "012",
price: mongoose.Types.Decimal128.fromString('100.00'),
quantity: 25,
image: "images/Product-img/product-12.png"
},

])
.then(() => console.log("saved"))
.catch(err => console.log(err))
