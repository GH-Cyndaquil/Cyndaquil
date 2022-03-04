const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const OrderDetails = require("../db/models/OrderDetails");

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
        userId: req.body.userId,
        fulfilled: false,
      },
      include: {
        model: Product,
      },
    });

    await item.addProduct(req.body.productId, {
      through: {
        price: req.body.price,
        quantityOrdered: req.body.quantity,
      },
    });

    const newCart = await Order.findOne({
      where: {
        userId: req.body.userId,
        fulfilled: false,
      },
      include: {
        model: Product,
      },
    });

    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
