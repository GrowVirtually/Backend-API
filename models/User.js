const bcrypt = require('bcrypt');
const pool = require('./db');
const AppError = require('../utils/appError');

const hashPassword = async (password) => {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

exports.oneUser = async (req) => {
  try {
    const { phone } = req.body;
    const result = await pool.query('SELECT * FROM systemuser WHERE tel = $1', [
      phone,
    ]);
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

// create new systemuser
exports.createUser = async (req, res, next) => {
  const { tel, email, fname, lname, password } = req.body;

  const hashedPwd = await hashPassword(password);

  try {
    const result = await pool.query(
      'INSERT INTO systemuser (fname, lname, tel, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING fname, userid, tel',
      [fname, lname, tel, email, hashedPwd]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
    // catch these errors properly [TODO]
    // return next(new AppError('Error inserting user', 400));
  }
};
