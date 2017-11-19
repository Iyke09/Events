module.exports = (sequelize, DataTypes) => {
  const Eevent = sequelize.define('Eevent', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 10],
          msg: 'name must start with a letter and be at least 3 characters.'
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9-]+$/i,
          msg: 'only alphabets are allowed for the title'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-za-z]*$/,
          msg: 'only alphabets are allowed'
        }
      }
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]*$/,
          msg: 'only numbers are allowed'
        }
      }
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
