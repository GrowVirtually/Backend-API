'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gig.belongsTo(models.User, {
        foreignKey: 'userid',
        as: 'user',
      });
    }
  }

  Gig.init(
    {
      gigType: DataTypes.ENUM('pre', 'post'),
      gigTitle: DataTypes.STRING,
      gigDescription: DataTypes.STRING,
      minOrderAmount: DataTypes.DECIMAL(10, 2),
      unit: DataTypes.ENUM('kg', 'g', 'pcs'),
      unitPrice: DataTypes.DECIMAL(10, 2),
      stock: DataTypes.DECIMAL(10, 2),
      sold: DataTypes.DECIMAL(10, 2),
      gigDuration: DataTypes.DATEONLY,
      userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Gig',
    }
  );

  return Gig;
};
