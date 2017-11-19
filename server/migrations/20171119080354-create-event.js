module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Eevents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING
    },
    guests: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    time: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    centerId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Eevents'),
};
