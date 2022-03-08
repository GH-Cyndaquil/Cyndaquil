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
/*
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
*/
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
