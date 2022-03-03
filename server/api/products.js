const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
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
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId },
    });

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.isAdmin) {
      await Product.create(req.body);
      res.send();
    } else {
      const error = new Error("Only Admins can create products");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});
