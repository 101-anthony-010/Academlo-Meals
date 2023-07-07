const Order = require("../models/order.model");
const User = require("../models/user.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  if (!order)
    next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
  
  req.user = order.user;
  req.order = order;
  next()
});