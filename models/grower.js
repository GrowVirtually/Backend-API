'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Grower.belongsTo(models.Customer, {
        foreignKey: 'userid',
        as: 'customer',
      });

      Grower.hasMany(models.Review, {
        foreignKey: 'growerId',
        as: 'reviews',
      });
    }
  }

  Grower.init(
    {
      userid: DataTypes.INTEGER,
      growerType: DataTypes.ENUM('premium', 'normal'),
      points: DataTypes.DECIMAL(10, 2),
      ratings: DataTypes.DECIMAL(2, 1),
      totalOrders: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Grower',
    }
  );
  return Grower;
};
