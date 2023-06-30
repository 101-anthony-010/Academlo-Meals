const Order = require("../models/order.model");
const catchAsync = require("../utils/catchAsync");

exports.findAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.findAll({
        where: {
            status: 'active',
        }
    });

    res.status(200).json({
        statusbar: 'success',
        orders
    })
});

exports.findOneOrder = catchAsync(async (req, res, next) => {
    const { order } = req

    res.status(200).json({
        statusbar: 'success',
        order
    })
});