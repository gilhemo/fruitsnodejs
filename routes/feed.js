const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/fruits',
  [body('description').isLength({ min: 5 })],
  isAuth,
  feedController.getFruits
);

router.post('/fruit/:fruitId', isAuth, feedController.updateFruit);

module.exports = router;
