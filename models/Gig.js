const pool = require('./db');

exports.test = async (req, res) => {
  await pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    // console.log(results);
    // return results.rows;
  });
};

exports.getOne = async (req, res, next) => {
  const { table, tableId } = req.body;
  console.log(table);
  try {
    const result = await pool.query(
      `SELECT * FROM ${table} WHERE userId = ${tableId}`,
      (error, results) => {
        if (error) {
          throw error;
        }
        // res.status(200).json(results.rows);
        // console.log(results);
        // return results.rows;
        return results;
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    return 'error';
  }
  return 'error';
};

// create new systemuser
exports.createUser = async (req, res, next) => {};

// module.exports = { test, create };
