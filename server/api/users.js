const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      address,
      city,
      state,
      postalCode,
    } = req.body;
    const user = await User.findByPk(req.params.id);
    await user.update({
      firstName,
      lastName,
      email,
      username,
      address,
      city,
      state,
      postalCode,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
