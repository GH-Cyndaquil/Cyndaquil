const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const OrderDetails = require("../db/models/OrderDetails");
const User = require("../db/models/User");
// const { default: user } = require("../../client/store/user");

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
        const newOrder = await Order.findOne({
          where: {
            userId: req.params.id,
            fulfilled: false,
          },
          include: Product,
        });
        res.json(newOrder);
      } else {
        res.json(order);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { productId, price, quantity, userId, unitPrice } = req.body;

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
          price: req.body.unitPrice,
          quantityOrdered: req.body.quantity,
        },
      });
    } else {
      let newQuantityOrdered =
        Number(ifOrderExists.dataValues.quantityOrdered) + Number(quantity);
      await ifOrderExists.update({
        price: req.body.unitPrice,
        quantityOrdered: newQuantityOrdered,
      });
    }

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
    const { email, shipAddress, shipCity, shipState, shipPostalCode } =
      req.body;

    const completeOrder = await Order.findOne({
      where: {
        id: req.body.orderId,
      },
    });
    await completeOrder.update({
      fulfilled: true,
      shipAddress,
      shipCity,
      shipState,
      shipPostalCode,
    });

    res.send();
  } catch (error) {
    next(error);
  }
});

router.put("/confirmGuest", async (req, res, next) => {
  try {
    const { order, email, shipAddress, shipCity, shipState, shipPostalCode } =
      req.body;

    let thisId = (Math.random() + 1).toString(36).substring(7);

    console.log(thisId, "<======thisId");

    const thisUser = await User.create({
      email,
      address: shipAddress,
      city: shipCity,
      state: shipState,
      postalCode: shipPostalCode,
      isAdmin: false,
      username: thisId,
      password: "thisisfake",
      firstName: "jane",
      lastName: "doe",
    });
    const thisOrder = await Order.create({
      orderDate: new Date(),
      shipAddress,
      shipState,
      shipCity,
      shipPostalCode,
      fulfilled: true,
    });
    let idxOrder = thisOrder.Id;
    let idxUser = thisUser.id;

    await thisOrder.setUser(idxUser);

    await thisOrder.addProduct(idxOrder, {
      through: { price: 3.5, quantityOrdered: 1 },
    });
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

    const newOrder = await Order.findOne({
      where: {
        userId: userid,
        fulfilled: false,
      },
      include: Product,
    });
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let { id, userId, quantity } = req.body;

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
