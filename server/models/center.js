module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. Center name must be unique',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'name field cannot be empty',
        },
        len: {
          args: [4, 25],
          msg: 'name must be atleast 4 characters long',
        },
        is: {
          args: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
          msg: 'name must be alphanumeric',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'description field cannot be empty',
        },
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
        notEmpty: {
          args: true,
          msg: 'capacity field cannot be empty',
        },
        is: {
          args: /^[0-9]*$/,
          msg: 'only numbers are allowed for the capacity of the center',
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'price field cannot be empty',
        },
        isDecimal: {
          args: true,
          msg: 'Only numbers are allowed for the price of a center',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error('Require either both latitude and longitude or neither');
        }
      }
    }
  }
);

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
