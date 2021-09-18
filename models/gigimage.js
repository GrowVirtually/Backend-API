'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GigImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GigImage.belongsTo(models.Gig, {
        foreignKey: 'gigId',
        as: 'gig',
      });
    }
  }
  GigImage.init(
    {
      gigId: DataTypes.INTEGER,
      imgLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'GigImage',
    }
  );
  return GigImage;
};
