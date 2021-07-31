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

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

User.beforeCreate(async (user) => {
  // hash password before saving to the database
  const salt = await bcrypt.genSaltSync(10, 'a');
  user.password = bcrypt.hashSync(user.password, salt);
});

User.beforeUpdate(async (user) => {
  // hash password before update
  if (user.password) {
    const salt = await bcrypt.genSaltSync(10, 'a');
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

const oneUser = async (columns) => {
  try {
    const { phone, email } = columns;
    if (phone) {
      const result = await pool.query(
        'SELECT * FROM systemuser WHERE tel = $1',
        [phone]
      );
      return result.rows[0];
    }

    if (email) {
      const result = await pool.query(
        'SELECT * FROM systemuser WHERE email = $1',
        [email]
      );
      return result.rows[0];
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = User;
