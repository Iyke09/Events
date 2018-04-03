module.exports = (sequelize, DataTypes) => {
  const Eevent = sequelize.define('Eevent', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-Z0-9-,]+(\s{0,1}[a-zA-Z0-9-, ])*$/,
          msg: 'only alphabets are allowed for the title',
        },
        len: {
          args: [4, 125],
          msg: 'title must be at least 4 characters.',
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-za-z]*$/,
          msg: 'only alphabets are allowed for type of event',
        },
        len: {
          args: [4, 25],
          msg: 'type of event must be at least 4 characters.',
        },
      },
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'time field cannot be empty',
        },
      },
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'date field cannot be empty',
        },
      },
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]*$/,
          msg: 'only numbers are allowed for guests field',
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    centerId: {
      type: DataTypes.INTEGER,
    },
  });

  Eevent.associate = (models) => {
    Eevent.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };


  return Eevent;
};
