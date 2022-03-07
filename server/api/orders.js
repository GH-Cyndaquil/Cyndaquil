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

router.get('/:id', async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
      const orders = await Order.findOne({
        where: {
          id: req.params.id,
        },
        include: OrderDetails,
      });
      let products = [];
      for (let i = 0; i < orders['order-details'].length; i++) {
        products.push(
          await Product.findByPk(
            orders['order-details'][i].dataValues.productId
          )
        );
      }
      orders.dataValues['products'] = products;
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
        id: userId,
      },
      include: OrderDetails,
    });
    let products = [];
    for (let i = 0; i < newCart['order-details'].length; i++) {
      products.push(
        await Product.findByPk(newCart['order-details'][i].dataValues.productId)
      );
    }
    newCart.dataValues['products'] = products;

    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
