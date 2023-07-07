const Meal = require("../models/meal.model");
const Restaurant = require("../models/restaurant.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validMeals = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const meal = await Meal.findOne({
      where: {
        status: "active",
        id
      },
        include: {
          model: Restaurant
        }
    });

    if (!meal)
      next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
    
    // req.restaurant = meal.restaurant
    req.meal = meal;
    next()
});