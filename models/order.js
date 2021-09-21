'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasOne(models.Payment, {
        foreignKey: 'orderId',
        as: 'payment',
      });

      Order.belongsTo(models.Gig, {
        foreignKey: 'gigId',
        as: 'gig',
      });

      Order.belongsTo(models.Consumer, {
        foreignKey: 'consumerId',
        as: 'consumer',
      });

      Order.belongsTo(models.Grower, {
        foreignKey: 'growerId',
        as: 'grower',
      });
    }
  }

  Order.init(
    {
      quantity: DataTypes.DECIMAL(10, 4),
      paymentAmount: DataTypes.DECIMAL(8, 2),
      isOrderCompleted: DataTypes.BOOLEAN,
      isGrowerAccepted: DataTypes.BOOLEAN,
      isConsumerCompleted: DataTypes.BOOLEAN,
      isGrowerCompleted: DataTypes.BOOLEAN,
      deliveryMethod: DataTypes.ENUM('self', 'seller'),
      growerId: DataTypes.INTEGER,
      consumerId: DataTypes.INTEGER,
      gigId: DataTypes.INTEGER,
      qrLink: DataTypes.TEXT,
      growerFname: DataTypes.TEXT,
      growerLname: DataTypes.TEXT,
      gigTitle: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
