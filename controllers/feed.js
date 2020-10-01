const { validationResult } = require('express-validator/check');

const Fruit = require('../models/fruit');

exports.getFruits = (req, res, next) => {
  Fruit.find()
    .then((fruits) => {
      res.status(200).json({
        message: 'Fetched fruits successfully.',
        fruits: fruits,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFruit = (req, res, next) => {
  const fruitId = req.params.fruitId;
  Fruit.findById(fruitId)
    .then((fruit) => {
      if (!fruit) {
        const error = new Error('Could not find fruit.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Fruit fetched.', fruit: fruit });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateFruit = (req, res, next) => {
  const fruitId = req.params.fruitId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const description = req.body.description;
  Fruit.findById(fruitId)
    .then((fruit) => {
      if (!fruit) {
        const error = new Error('Could not find fruit.');
        error.statusCode = 404;
        throw error;
      }
      fruit.description = description;
      return fruit.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'fruit updated!', fruit: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
