const router = require('express').Router();
const {
  models: { Ingredient },
} = require('../db');

//mounted on /api/ingredients
router.get('/', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).send(ingredients);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
