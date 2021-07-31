const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const pool = require('./db');
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./db');

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    userid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    nic: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'none'),
      defaultValue: 'none',
    },
    imglink: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  }
);

(async () => {
  await sequelize.sync();
})();

// TODO: check whether it's also running before an update
User.beforeCreate(async (user) => {
  // hash password before saving to the database
  user.password = await bcrypt.hash(user.password, 10);
});

// instance methods
User.prototype.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);

User.prototype.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = User;
