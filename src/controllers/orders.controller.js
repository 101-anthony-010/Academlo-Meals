const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });
  
  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  const order = await Order.create({
    mealId,
    quantity,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
  });

  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'address'],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.findOneOrder = catchAsync(async (req, res, next) => {
    const { order } = req

    res.status(200).json({
        statusbar: 'success',
        order
    })
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const newOrder = await order.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'updated',
    order: newOrder,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'deleted',
    message: 'Order has been deleted',
  });
});