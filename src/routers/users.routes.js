const express = require('express');

const router = express.Router();

//Controller functions
const usersController = require('./../controllers/user.controller')
const ordersController = require('./../controllers/orders.controller')
const authController = require('./../controllers/auth.controller')

//Middleware functions
const usersMiddleware = require('./../middlewares/users.middleware')
const ordersMiddleware = require('./../middlewares/orders.middleware')
const authMiddleware = require('./../middlewares/auth.middleware')
const validations = require('./../middlewares/validations.middleware')

router
  .route('/signup')
  .post(
    validations.createUserValidator,
    authController.signup
  )

router
  .route('/login')
  .post(authController.login)

router.use(authMiddleware.protect)

router
  .route('/:id')
  .patch(
    usersMiddleware.validUser, 
    authMiddleware.protectAccountOwner, 
    usersController.updateUser
  )
  .delete(
    usersMiddleware.validUser, 
    authMiddleware.protectAccountOwner, 
    usersController.deleteUser
  )

router
  .route('/orders')
  .get(ordersController.findAllOrders)

router
  .use('/orders/:id', ordersMiddleware.validOrder)
  .route('/orders/:id')
  .get(ordersController.findOneOrder)

module.exports = router;