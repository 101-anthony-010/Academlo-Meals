const Review = require("../models/review.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validReview = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const review = await Review.findOne({
        where: {
            id
        }
    })

    if (!review) 
        next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));

    req.Review = review;
    next()
});