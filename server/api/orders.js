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

router.post("/", async (req, res, next) => {
  try {
    const [item, wasCreated] = await Order.findOrCreate({
      where: {
        fulfilled: false,
      },
      include: Product,
    });
    item.addProduct(req.body, {
      through: {
        price: req.body.price,
        quantityOrdered: req.body.quantityOrdered,
        fulfilled: false,
      },
    });

    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
