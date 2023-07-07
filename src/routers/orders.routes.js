const express = require('express');

const router = express.Router();

//Controller functions
const ordersController = require('./../controllers/orders.controller')

//Middleware functions
const authMiddleware = require('./../middlewares/auth.middleware')
const orderMiddleware = require('./../middlewares/orders.middleware')
const validations = require('./../middlewares/validations.middleware')

router.use(authMiddleware.protect)

router
  .route('/')
  .post(
    validations.createOrderValidation,
    ordersController.createOrder
  )

router
  .route('/me')
  .get(ordersController.findAllOrders)

router.use(authMiddleware.protectAccountOwner)

router
  .route('/:id')
  .patch(
    orderMiddleware.validOrder,
    ordersController.updateOrder
  )
  .delete(
    orderMiddleware.validOrder,
    ordersController.deleteOrder
  )

module.exports = router