const catchAsync = require("../utils/catchAsync");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const User = require("../models/user.model");

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'address', 'rating'],
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

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    attributes: ['quantity', 'totalPrice', 'status'],
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req
  const { name, email } = req.body

  await user.update({name, email})

  res.status(200).json({
    status: 'updated',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({status: 'disabled'})

  res.status(200).json({
    status: 'deleted',
    message: "User has been deleted"
  })
});

