// const { Pool } = require('pg');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! 😔😔 Shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');
// const sequelize = require('./Old/db');

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PWD,
//   port: process.env.PG_PORT,
// });

const port = process.env.SERVER_PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

// for unhandled promise exceptions
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 😔😔 Shutting down..');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// const pool = require('./models/db');

// checking postgreSQL connection
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

/*
  why this file
  // it's better to use express app in one file and other configs in another file
    - db configuration
    - error handling stuffs
    - env variables
 */
