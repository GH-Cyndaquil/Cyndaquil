const router = require("express").Router();
const Product = require("../db/models/Product");
const User = require("../db/models/User");

const adminsOnly = (req, res, next) => {
  if (!req.User) {
    const err = new Error("Not logged in");
    err.status = 401;
    return next(err);
  } else if (!req.User.isAdmin) {
    const err = new Error("Off Limits");
    err.status = 401;
    return next(err);
  }
  next();
};

router.post("/", adminsOnly, async (req, res, next) => {
  try {
    const newCreatedProduct = await Product.create(req.body);
    res.json(newCreatedProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/", adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: Product.name,
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:ProductId", adminsOnly, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", adminsOnly, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const productUpdate = await Product.findByPk(id);
    await productUpdate.update(req.body);
    res.status(201).send(productUpdate);
  } catch (error) {
    next(error);
  }
});
