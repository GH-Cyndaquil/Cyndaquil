const router = require("express").Router();
const User = require("../db/models/User");

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

router.delete("/:userId", adminsOnly, async (req, res, next) => {
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
    const userUpdate = await User.findByPk(id);
    await userUpdate.update(req.body);
    res.status(201).send(userUpdate);
  } catch (error) {
    next(error);
  }
});
