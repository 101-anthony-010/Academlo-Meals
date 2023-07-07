const Review = require("../models/review.model");
const User = require("../models/user.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validReview = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const review = await Review.findOne({
    where: {
      id,
      restaurantId: restaurantId,
      status: 'active',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  })

  if (!review) 
    next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
  
  req.user = review.user
  req.review = review;
  next()
});