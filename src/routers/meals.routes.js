const express = require('express');

const router = express.Router();

//Controller functions
const mealsController = require('./../controllers/meals.controller')

//Middleware functions
const authMiddleware = require('./../middlewares/auth.middleware')
const mealMiddleware = require('./../middlewares/meals.middleware')
const validations = require('./../middlewares/validations.middleware')

router
  .route('/')
  .get(mealsController.findAllMeals)
  
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin'))

router
  .route('/:id')
  .get(
    mealMiddleware.validMeals,
    mealsController.findOneMeal
  )
  .post(
    validations.createMealValidation,
    mealsController.createMeal
  )
  .patch(
    mealMiddleware.validMeals,
    validations.updateMealValidation,
    mealsController.updatedMeal
  )
  .delete(
    mealMiddleware.validMeals,
    mealsController.deletedMeal
  )


module.exports = router