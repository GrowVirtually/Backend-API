'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      paymentAmount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      isOrderCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isGrowerAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isConsumerCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isGrowerCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deliveryMethod: {
        type: Sequelize.ENUM('self', 'seller'),
        allowNull: false,
      },
      growerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Growers',
          key: 'userid',
          as: 'growerId',
        },
      },
      consumerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Consumers',
          key: 'userid',
          as: 'consumerId',
        },
      },
      gigId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Gigs',
          key: 'id',
          as: 'gigId',
        },
      },
      qrLink: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Orders');
  },
};
