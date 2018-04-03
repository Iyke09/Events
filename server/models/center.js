module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. Center name must be unique',
        // fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
        is: {
          args: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
          msg: 'name must be alphanumeric',
        },
        len: {
          args: [4, 25],
          msg: 'name must be atleast 4 characters long',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 250],
          msg: 'description must be atleast 10 characters',
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'location field cannot be empty',
        },
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        is: {
          args: /^[0-9]*$/,
          msg: 'only numbers are allowed',
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Only numbers are allowed',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
    },
  });

  Center.associate = (models) => {
    Center.hasMany(models.Eevent, {
      foreignKey: 'centerId',
      as: 'events',
    });
    Center.hasMany(models.Favorite, {
      foreignKey: 'centerId',
      as: 'favorites',
    });
  };

  return Center;
};
