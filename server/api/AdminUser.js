const router = require("express").Router();

const {
  models: { User },
} = require("../db");
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

router.get("/", adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: User.username }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "firstName",
        "lastName",
        "email",
        "username",
        "address",
        "city",
        "state",
        "postalCode",
        "isAdmin",
      ],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", adminsOnly, async (req, res, next) => {
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
      isAdmin,
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
      isAdmin,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
