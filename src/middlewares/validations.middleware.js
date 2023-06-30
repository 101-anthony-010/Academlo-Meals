const { body ,validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8})
    .withMessage('Password must be at least 8 characters'),    
  validateFields,
]

exports.updateUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),   
  validateFields,
]

exports.createRestaurantValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Address must be between 5 and 100 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  validateFields,
]

exports.updateRestaurantValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Address must be between 5 and 100 characters'),
  validateFields,
]