// const { Pool } = require('pg');
//
// const dotenv = require('dotenv');
//
// dotenv.config({ path: '../config.env' });
//
// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PWD,
//   port: process.env.PG_PORT,
// });
//

const { Sequelize } = require('sequelize');

// Passing a connection -> URI DEV_DATABASE_URL=postgres://<db_user>:<db_password>@127.0.0.1:5432/dev_db
const sequelize = new Sequelize(
  'postgres://postgres:admin@localhost:5432/grovi',
  {
    logging: false,
  }
);

module.exports = sequelize;
