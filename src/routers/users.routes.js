const express = require('express');

const router = express.Router();

//Controller functions
const {
    signup, login
} = require('./../controllers/auth.controller')
const {
    updateUser, deleteUser
} = require('./../controllers/user.controller')
const {
    findAllOrders, findOneOrder
} = require('./../controllers/orders.controller')

//Middleware functions
const {
    validUser
} = require('./../middlewares/users.middleware')
const {
    validOrder
} = require('./../middlewares/orders.middleware')
const {
    protect, protectAccountOwner
} = require('./../middlewares/auth.middleware')
const {
    createUserValidator, updateUserValidator
} = require('./../middlewares/validations.middleware')

router
    .route('/signup')
    .post(createUserValidator, updateUserValidator, signup)

router
    .route('/login')
    .post(login)

router.use(protect)

router
    .route('/:id')
    .patch(validUser, protectAccountOwner, updateUser)
    .delete(validUser, protectAccountOwner, deleteUser)

router
    .route('/orders')
    .get(findAllOrders)

router
    .route('/orders/:id')
    .get(validOrder, findOneOrder)

module.exports = router;