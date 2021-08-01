const bcrypt = require('bcrypt');
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
    tel: {
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
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  }
);

const hashPassword = async (pwd) => {
  const password = pwd;
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

// create new systemuser
exports.createUser = async (req, res, next) => {
  const { password } = req.body;

  const hashedPwd = await hashPassword(password);

  try {
    await sequelize.sync();
    const user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      tel: req.body.tel,
      email: req.body.email,
      password: hashedPwd,
    });
    const success = await user.save();
    return success;
  } catch (err) {
    console.log('insert error - ', err);
    return err;
  }
};

exports.oneUser = async (columns) => {
  try {
    const { phone, email } = columns;
    if (phone) {
      const result = await User.findOne({ where: { tel: phone } });
      return result.rows[0];
    }

    if (email) {
      const result = await User.findOne({ where: { email: email } });
      return result.rows[0];
    }
  } catch (err) {
    console.log(err);
  }
};
