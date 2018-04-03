

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    centerId: DataTypes.INTEGER
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Center, {
      foreignKey: 'centerId',
      as: 'center',
    });
  };


  return Favorite;
};
