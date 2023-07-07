const Review = require('./review.model');
const User = require('./user.model');
const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');
const Order = require('./order.model');

const initModel = () => {
  User.hasMany(Review, {foreinKey: "userId"});
  Review.belongsTo(User, {foreinKey: "userId"});

  Restaurant.hasMany(Review, {foreinKey: "restaurantId"});
  Review.belongsTo(Restaurant, {foreinKey: "restaurantId"});

  Restaurant.hasMany(Meal, {foreignKey: "restaurantId"});
  Meal.belongsTo(Restaurant, {foreignKey: "restaurantId"});

  User.hasMany(Order, {foreignKey: "userId"});
  Order.belongsTo(User, {foreignKey: "userId"});

  Meal.hasOne(Order, {foreignKey: "mealId"});
  Order.belongsTo(Meal, {foreignKey: "mealId"});
};

module.exports = initModel;