'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, {
        foreignKey: 'userid',
        as: 'user',
      });

      Customer.hasMany(models.Consumer, {
        foreignKey: 'userid',
        as: 'consumers',
      });

      Customer.hasMany(models.Grower, {
        foreignKey: 'userid',
        as: 'growers',
      });
    }
  }

  Customer.init(
    {
      userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
