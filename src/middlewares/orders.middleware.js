const Order = require("../models/order.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const order = await Order.findOne({
        status: "active",
        id
    });

    if (!order)
        next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
    
    req.order = order;
    next()
});