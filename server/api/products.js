const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

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
