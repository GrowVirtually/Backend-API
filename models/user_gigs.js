'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Gigs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User_Gigs.belongsToMany(models.User, {
      //   through: 'User_Gigs',
      //   as: 'users',
      //   foreignKey: 'id',
      // });
      // User_Gigs.belongsToMany(models.Gig, {
      //   through: 'User_Gigs',
      //   as: 'gigs',
      //   foreignKey: 'id',
      // });
    }
  }

  User_Gigs.init(
    {
      gigId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_Gigs',
    }
  );
  return User_Gigs;
};
