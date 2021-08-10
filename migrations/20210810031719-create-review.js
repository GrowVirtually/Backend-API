'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      consumerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Consumers',
          key: 'userid',
          as: 'consumerId',
        },
      },
      growerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Growers',
          key: 'userid',
          as: 'growerId',
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  },
};
