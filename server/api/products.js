const router = require('express').Router();
const {
  models: { Product, User },
} = require('../db');
module.exports = router;
//auth middleware
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.isAdmin = user.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

//mounted on /api/products
router.get('/', async (req, res, next) => {
  try {
    let filterObj = {};
    let { regionfilter, ingredientfilter } = req.headers;
    if (Number(regionfilter) > 0) {
      filterObj.regionId = Number(regionfilter);
    }
    if (Number(ingredientfilter) > 0) {
      filterObj.ingredientId = Number(ingredientfilter);
    }

    if (req.query.page) {
      const products = await Product.findAndCountAll({
        order: [['id', 'ASC']],
        where: filterObj,
        offset: req.query.page * 10 - 10,
        limit: 20,
      });

      res.send(products.rows);
      return;
    } else {
      const products = await Product.findAll({
        order: [['id', 'ASC']],
        where: filterObj,
      });
      res.send(products);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId },
    });

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    if (req.isAdmin) {
      await Product.create(req.body);
      res.send();
    } else {
      const error = new Error('Only Admins can create products');
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// admin
const adminsOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You are not logged in');
    err.status = 401;
    return next(err);
  } else if (!req.user.isAdmin) {
    const err = new Error('Off Limits');
    err.status = 401;
    return next(err);
  }
  next();
};

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
    } else {
      const error = new Error('Product not found');
      error.status = '404';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json(product);
    } else {
      const error = new Error('Product not found');
      error.status = '404';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});
