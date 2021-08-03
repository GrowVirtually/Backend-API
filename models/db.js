const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const { Sequelize } = require('sequelize');

// Passing a connection -> URI DEV_DATABASE_URL=postgres://<db_user>:<db_password>@127.0.0.1:5432/dev_db
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  {
    logging: false,
  }
);

module.exports = sequelize;
