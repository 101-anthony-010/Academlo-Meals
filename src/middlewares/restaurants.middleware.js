const Restaurant = require("../models/restaurant.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const restaurant = await Restaurant.findOne({
        where: {
            status: "active",
            id
        }
    });

    if (!restaurant)
        next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
    
    req.restaurant = restaurant;
    next()
});