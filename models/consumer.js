'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Consumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consumer.belongsTo(models.Customer, {
        foreignKey: 'userid',
        as: 'customer',
      });

      Consumer.hasOne(models.ConsumerLocation, {
        foreignKey: 'userid',
        as: 'location',
      });

      Consumer.hasMany(models.Review, {
        foreignKey: 'consumerId',
        as: 'reviews',
      });

      Consumer.hasMany(models.Order, {
        foreignKey: 'consumerId',
        as: 'orders',
      });
    }
  }

  Consumer.init(
    {
      userid: DataTypes.INTEGER,
      cOrderCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Consumer',
    }
  );
  return Consumer;
};
