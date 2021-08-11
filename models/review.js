'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Consumer, {
        foreignKey: 'consumerId',
        as: 'consumer',
      });

      Review.belongsTo(models.Grower, {
        foreignKey: 'growerId',
        as: 'grower',
      });
    }
  }

  Review.init(
    {
      content: DataTypes.STRING,
      consumerId: DataTypes.INTEGER,
      growerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
