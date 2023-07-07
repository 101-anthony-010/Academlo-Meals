const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");
const User = require("../models/user.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params
  
  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Review,
        attributes: ['comment', 'rating'],
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      },
    ],
  });
  
  if (!restaurant)
      next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
  
  req.restaurant = restaurant;
  next()
});