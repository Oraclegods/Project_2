// middleware/validation.js
const { body, param } = require('express-validator');

const validateItems = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('inStock').isBoolean().withMessage('inStock must be true or false'),
];


const validateUser = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required'),
    
  body('email')
    .isEmail()
    .withMessage('A valid email is required'),

  body('gender')
    .isString()
    .notEmpty()
    .withMessage('Gender is required'),

  body('Birthday')
    .isISO8601()
    .toDate()
    .withMessage('Birthday must be a valid date'),

  body('school')
    .isString()
    .notEmpty()
    .withMessage('School is required'),

  body('course')
    .isString()
    .notEmpty()
    .withMessage('Course is required'),

  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 }) // you can adjust range
    .withMessage('Year must be a valid number'),
];

module.exports = validateUser;


const validateIdParam = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

module.exports = {
  validateItems,
  validateUser,
  validateIdParam
};
