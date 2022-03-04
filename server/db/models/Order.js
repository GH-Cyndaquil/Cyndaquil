const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  shipAddress: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  shipState: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  shipCity: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  shipPostalCode: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
