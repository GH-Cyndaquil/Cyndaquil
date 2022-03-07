const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const OrderDetails = require("../db/models/OrderDetails");

//for specific order
router.get("/:id", async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
    }
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

//for order history
router.get("/history/:id", async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
      const orders = await Order.findAll({
        where: {
          userId: req.params.id,
          fulfilled: true,
        },
        include: Product,
      });
      res.json(orders);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/cart/:id", async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
      const [order, wasCreated] = await Order.findOrCreate({
        where: {
          userId: req.params.id,
          fulfilled: false,
        },
        include: Product,
      });
      if (wasCreated) {
        order.setUser(req.params.id);
      }
      res.json(order);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { productId, price, quantity, userId } = req.body;

    const [item, wasCreated] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        fulfilled: false,
      },
      include: {
        model: Product,
      },
    });

    const ifOrderExists = await OrderDetails.findOne({
      where: {
        productId: productId,
        orderId: item.dataValues.id,
      },
    });

    if (!ifOrderExists) {
      await item.addProduct(req.body.productId, {
        through: {
          price: req.body.price,
          quantityOrdered: req.body.quantity,
        },
      });
    } else {
      let newPrice = Number(ifOrderExists.dataValues.price) + Number(price);
      let newQuantityOrdered =
        Number(ifOrderExists.dataValues.quantityOrdered) + Number(quantity);
      await ifOrderExists.update({
        price: newPrice,
        quantityOrdered: newQuantityOrdered,
      });
    }

    // what is cors
    router.post("/payment", async (req, res, next) => {
      let { amount, id } = req.body;
      try {
        const payment = await stripe.paymentItents.create({
          amount,
          currency: "USD",
          description: "NYET Vodka",
          payment_method: id,
          confirm: true,
        });
        console.log("payment", payment);
        res.json({
          message: "Payment successful",
          success: true,
        });
      } catch (error) {
        console.log("error", error),
          res.json({
            message: "Payment failed",
            success: false,
          });
      }
    });

    const newCart = await Order.findOne({
      where: {
        userId: userId,
      },
      include: Product,
    });

    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

router.put("/confirm", async (req, res, next) => {
  try {
    const completeOrder = await Order.findOne({
      where: {
        id: req.body.orderId,
      },
    });
    await completeOrder.update({ fulfilled: true });
    res.send();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let { id, userid } = req.headers;

    const item = await OrderDetails.findOne({
      where: {
        productId: id,
        orderId: req.params.id,
      },
    });

    await item.destroy();

    const newCart = await Order.findOne({
      where: {
        userId: userid,
      },
      include: Product,
    });

    res.json(newCart);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let { id, userId, quantity } = req.body;
    console.log(quantity);

    const item = await OrderDetails.findOne({
      where: {
        productId: id,
        orderId: req.params.id,
      },
    });

    await item.update({ quantityOrdered: quantity });

    const newCart = await Order.findOne({
      where: {
        userId: userId,
      },
      include: Product,
    });

    res.json(newCart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
