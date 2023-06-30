const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurant.model");

exports.createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body

    const restaurant = await Restaurant.create({
        name: name.toLowerCase(),
        address: address.toLowerCase(),
        rating
    })

    res.status(200).json({
        status: 'success',
        restaurant
    });
});

exports.findAllRestaurant = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({
        where: {
            status: 'active',
        }
    })

    res.status(200).json({
        status: 'success',
        restaurants
    });
});

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req

    res.status(200).json({
        status: 'success',
        restaurant,
    });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req
    const { name, address } = req.body

    await restaurant.update({
        name: name.toLowerCase(),
        address: address.toLowerCase(),
    })

    res.status(200).json({
        status: 'updated',
        restaurant
    })
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req

    await restaurant.update({ status: 'disabled' })

    res.status(200).json({
        status: 'deleted',
        restaurant
    })
});
