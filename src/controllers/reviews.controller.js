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
  const { rating, comment } = req.body;
  const { review } = req;

  const newReview = await review.update({
    rating,
    comment,
  });

  res.status(200).json({
    status: 'updated',
    review: newReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  res.status(200).json({
    status: 'deleted',
    message: 'Deleted has been deleted',
  });
});