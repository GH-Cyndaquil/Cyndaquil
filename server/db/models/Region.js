const Sequelize = require("sequelize");
const db = require("../db");

const Region = db.define("region", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Region;
