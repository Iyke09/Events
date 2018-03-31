'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    centerId: DataTypes.INTEGER,
    user: DataTypes.STRING,
    comment: DataTypes.STRING,
  });
  return Review;
};
