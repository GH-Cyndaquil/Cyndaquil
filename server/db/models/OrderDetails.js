const Sequelize = require("sequelize");
const db = require("../db");

const OrderDetails = db.define("order-details", {
  quantityOrdered: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = OrderDetails;
