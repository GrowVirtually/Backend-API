'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

      User.hasMany(models.Customer, {
        foreignKey: 'userid',
        as: 'customers',
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

  User.beforeUpdate(async (user) => {
    // calculate points
    let pointBasedOnUserType = 0;
    switch (user.userType) {
      case 'normal':
        pointBasedOnUserType = 1;
        break;
      case 'premium':
        pointBasedOnUserType = 2;
        break;
      default:
    }

    // points calculation algorithm
    // TODO: update this algorithm
    const algo = (user.ratings + user.totalOrders + pointBasedOnUserType) / 3;
    user.points = Math.round(algo * 100) / 100;
  });

  User.beforeUpdate(async (user) => {
    // hash password before saving to the database
    user.password = await bcrypt.hash(user.password, 10);

    // console.log(`create user is: `, user);
  });

  User.beforeUpdate(async (user) => {
    if (!user._changed.has('password') || user.isNewRecord) {
      return;
    }
    user.passwordChangedAt = Date.now();
  });

  // instance methods
  User.prototype.correctPassword = async (candidatePassword, userPassword) =>
    await bcrypt.compare(candidatePassword, userPassword);

  User.prototype.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        new Date(this.passwordChangedAt).getTime() / 1000,
        10
      );
      // console.log(changedTimestamp, JWTTimestamp);
      return JWTTimestamp < changedTimestamp;
    }

    // false means not change
    return false;
  };

  User.prototype.createPasswordResetToken = function (isMobile = true) {
    let resetToken;
    if (isMobile) {
      resetToken = Math.floor(1000 + Math.random() * 9000).toString();
    } else {
      resetToken = crypto.randomBytes(32).toString('hex');
    }
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  };

  // the defined model is the class itself
  // console.log(User === sequelize.models.User); // true

  return User;
};
