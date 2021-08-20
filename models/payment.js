'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      });
    }
  }

  Payment.init(
    {
      paymentAmount: DataTypes.DECIMAL(10, 2),
      status: DataTypes.ENUM('success', 'pending', 'failed'),
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Payment',
    }
  );
  return Payment;
};
