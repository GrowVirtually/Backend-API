const { Pool } = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PWD,
  port: process.env.PG_PORT,
});

module.exports = pool;
