const express = require('express');

const router = express.Router();

//Controller functions
const {
    createRestaurant, findAllRestaurant, findOneRestaurant, updateRestaurant, deleteRestaurant,
} = require('./../controllers/restaurants.controller')
const {
    createReview, updateReview, deleteReview
} = require('./../controllers/reviews.controller')

//Middleware functions
const {
    createRestaurantValidator, updateRestaurantValidator
} = require('./../middlewares/validations.middleware')
const {
    validRestaurant
} = require('./../middlewares/restaurants.middleware')
const {
    validReview
} = require('./../middlewares/reviews.middleware')
const {
    protect, protectAccountOwner
} = require('./../middlewares/auth.middleware')

router
    .route('/')
    .post(createRestaurantValidator, createRestaurant)
    .get(findAllRestaurant)

router
    .route('/:id')
    .get(validRestaurant, findOneRestaurant)
    .patch(validRestaurant, updateRestaurantValidator, updateRestaurant)
    .delete(validRestaurant, deleteRestaurant)

// router.use(protect)

router
    .route('/reviews/:id')
    .post(protect, createReview)

router
    .route('/reviews/:restaurantId/:id')
    .patch(validReview, updateReview)
    // .delete(validReview, protectAccountOwner, deleteRestaurant)

module.exports = router