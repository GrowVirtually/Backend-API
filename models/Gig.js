const pool = require('./db');

const test = async (req, res) => {
  await pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    // console.log(results);
    // return results.rows;
  });
};

module.exports = { test };
