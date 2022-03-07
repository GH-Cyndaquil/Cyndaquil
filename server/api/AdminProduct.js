const router = require("express").Router();
const Product = require("../db/models/Product");
const User = require("../db/models/User");
module.exports = router;

const adminsOnly = (req, res, next) => {
  console.log("not a string", req.body.user);
  if (!req.body.user) {
    const err = new Error("Not logged in");
    err.status = 401;
    return next(err);
  } else if (!req.body.user.isAdmin) {
    const err = new Error("Off Limits");
    err.status = 401;
    return next(err);
  }
  next();
};

router.post("/", adminsOnly, async (req, res, next) => {
  try {
    console.log("test");
    const { name, description, price, quantity, imageUrl } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      imageUrl,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/", adminsOnly, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name"],
    });
    res.json(products);
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

router.put("/:id", adminsOnly, async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, quantity } = req.body;
    const user = await Product.findByPk(req.params.id);
    await user.update({
      name,
      price,
      description,
      imageUrl,
      quantity,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
