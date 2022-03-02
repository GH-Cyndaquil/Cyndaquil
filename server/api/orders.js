const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: Product,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: Product,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
