'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConsumerLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConsumerLocation.belongsTo(models.Consumer, {
        foreignKey: 'userid',
        as: 'consumer',
      });
    }
  }
  ConsumerLocation.init(
    {
      coordinates: DataTypes.GEOGRAPHY,
      userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ConsumerLocation',
    }
  );
  return ConsumerLocation;
};
