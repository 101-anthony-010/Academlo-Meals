const Restaurant = require("../models/restaurant.model");
const catchAsync = require("../utils/catchAsync");
const Meal = require('./../models/meal.model')

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body
  const { id } = req.params;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: "active",
    },
    include: [
      {
        model: Restaurant,
        attributes: ["name", "address"]
      }
    ]
  })

  res.status(200).json({
    status: "success",
    meals
  })
});

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  
  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updatedMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body
  const { meal } = req

  const newMeal = await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'updated',
    meal: newMeal,
  });
});

exports.deletedMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'disabled' });

  res.status(200).json({
    status: 'deleted',
    message: 'Meals have been deleted',
  });
});