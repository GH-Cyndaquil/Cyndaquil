const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const OrderDetails = require("../db/models/OrderDetails");
const {
  default: StripeContainer,
} = require("../../client/components/CheckoutUser");

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
