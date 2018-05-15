'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    centerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10, 250],
          msg: 'comment must be atleast 10 characters',
        },
      },
    },
  });
  return Review;
};
