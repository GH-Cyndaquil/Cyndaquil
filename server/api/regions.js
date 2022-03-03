const router = require('express').Router();
const {
  models: { Region },
} = require('../db');

//mounted on /api/regions
router.get('/', async (req, res, next) => {
  try {
    let regions = await Region.findAll({ order: [['id', 'ASC']] });
    res.status(200).send(regions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
