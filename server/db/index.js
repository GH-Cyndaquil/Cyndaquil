//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Ingredient = require("./models/Ingredient");
const Region = require("./models/Region");
const Order = require("./models/Order");
const OrderDetails = require("./models/OrderDetails");

//associations could go here!
Ingredient.hasMany(Product);
Product.belongsTo(Ingredient);

Region.hasMany(Product);
Product.belongsTo(Region);

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderDetails });
Product.belongsToMany(Order, { through: OrderDetails });

module.exports = {
  db,
  models: {
    User,
    Product,
    Ingredient,
    Region,
  },
};
