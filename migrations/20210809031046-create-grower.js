'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Growers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'userid',
          as: 'userid',
        },
      },
      growerType: {
        type: Sequelize.ENUM('premium', 'normal'),
        defaultValue: 'normal',
      },
      points: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      ratings: {
        type: Sequelize.DECIMAL(2, 1),
        defaultValue: 0.0,
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Growers');
  },
};
