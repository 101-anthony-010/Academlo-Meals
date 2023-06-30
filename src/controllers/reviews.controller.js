const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review.model");

exports.createReview = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { comment, rating } = req.body
    const { sessionUser } = req
    
    const review = await Review.create({
        comment: comment.toLowerCase(),
        rating,
        userId: sessionUser.id,
        restaurantId: id
    })

    res.status(200).json({
        status: 'success',
        review
    });
});

exports.updateReview = catchAsync(async (req, res, next) => {
    const { restaurantId, id } = req.params
    
    res.status(200).json({
        status: 'updated',
        restaurantId,
        id
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {

});