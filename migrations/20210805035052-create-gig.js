'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gigType: {
        type: Sequelize.ENUM('pre', 'post'),
        defaultValue: 'post',
      },
      gigTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gigDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      minOrderAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: Sequelize.ENUM('kg', 'g', 'pcs'),
        defaultValue: 'kg',
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sold: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      gigDuration: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userid',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Gigs');
  },
};
