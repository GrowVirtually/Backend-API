'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsTo(models.Gig, {
        foreignKey: 'gigid',
        as: 'gig',
      });
    }
  }

  Location.init(
    {
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      gigid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};
