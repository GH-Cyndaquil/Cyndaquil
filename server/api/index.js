const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/ingredients", require("./ingredients"));
router.use("/regions", require("./regions"));
router.use("/adminproduct", require("./AdminProduct"));
router.use("/adminuser", require("./AdminUser"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
