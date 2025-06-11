// middleware/validation.js
const { body, param } = require('express-validator');

const validateItems = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('inStock').isBoolean().withMessage('inStock must be true or false'),
];

const validateUser = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('inStock').isBoolean().withMessage('inStock must be true or false'),
];

const validateIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

module.exports = {
  validateItems,
  validateUser,
  validateIdParam
};
