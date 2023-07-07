const express = require('express');

const router = express.Router();

//Controller functions
const restaurantsController = require('./../controllers/restaurants.controller')
const reviewsController = require('./../controllers/reviews.controller')

//Middleware functions
const restaurantsMiddleware = require('./../middlewares/restaurants.middleware')
const reviewsMiddleware = require('./../middlewares/reviews.middleware')
const authMiddleware = require('./../middlewares/auth.middleware')
const validations = require('./../middlewares/validations.middleware')

router
  .route('/')
  .get(restaurantsController.findAllRestaurant)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validations.createRestaurantValidator, 
    restaurantsController.createRestaurant
  )

router
  .route('/:id')
  .get(
    restaurantsMiddleware.validRestaurant, 
    restaurantsController.findOneRestaurant
  )
  .patch(
    authMiddleware.protect,
    restaurantsMiddleware.validRestaurant,
    authMiddleware.restrictTo('admin'), 
    validations.updateRestaurantValidator, 
    restaurantsController.updateRestaurant
  )
  .delete(
    authMiddleware.protect,
    restaurantsMiddleware.validRestaurant, 
    authMiddleware.restrictTo('admin'),
    restaurantsController.deleteRestaurant
  )

router.use(authMiddleware.protect)

router
  .route('/reviews/:id')
  .post(
    restaurantsMiddleware.validRestaurant,
    validations.createReviewValidation,
    reviewsController.createReview
  )

router.use(authMiddleware.protectAccountOwner)

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    reviewsMiddleware.validReview, 
    reviewsController.updateReview,
    validations.updateReviewValidation
  )
  .delete(
    reviewsMiddleware.validReview,
    reviewsController.deleteReview
  )

module.exports = router