const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'grovi',
  password: 'admin',
  port: 5432,
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// checking postgreSQL connection
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

/*
  why this file
  // it's better to use express app in one file and other configs in another file
    - db configuration
    - error handling stuffs
    - env variables
 */
