const router = require("express").Router();
const Product = require("../db/models/Product");
//const User = require("../db/models/User");
module.exports = router;

const adminsOnly = (req, res, next) => {
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

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "price",
        "quantity",
        "description",
        "imageUrl",
      ],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("The Product has been deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", adminsOnly, async (req, res, next) => {
  try {
    const { name, price, description, imageUrl, quantity } = req.body;
    const product = await Product.findByPk(req.params.id);
    await product.update({
      name,
      price,
      description,
      imageUrl,
      quantity,
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    product.update({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    });
    res.send();
  } catch (error) {
    next(error);
  }
});
