const router = require('express').Router();
const Order = require('../db/models/Order');
const Product = require('../db/models/Product');
const OrderDetails = require('../db/models/OrderDetails');

router.get('/', async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
    }
    const orders = await Order.findAll({
      include: Product,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//for order history
router.get('/:id', async (req, res, next) => {
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

router.get('/cart/:id', async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
      const orders = await Order.findOne({
        where: {
          userId: req.params.id,
          fulfilled: false,
        },
        include: Product,
      });
      res.json(orders);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
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

module.exports = router;
