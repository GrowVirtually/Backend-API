'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Gig, {
        foreignKey: 'userid',
        as: 'gigs',
      });
    }
  }

  User.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      phone: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      nic: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.ENUM('male', 'female', 'none'),
      imgLink: DataTypes.STRING,
      role: DataTypes.ENUM('user', 'admin'),
      userType: DataTypes.ENUM('premium', 'normal'),
      points: DataTypes.DECIMAL(10, 2),
      ratings: DataTypes.DECIMAL(2, 1),
      totalOrders: DataTypes.INTEGER,
      password: DataTypes.STRING,
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
