const pool = require('../models/db');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// create new systemuser
exports.createUser = async (req, res, next) => {
  const { tel, email, fname, lname, password } = req.body;

  const hashedPwd = await hashPassword(password);
  console.log(hashedPwd);

  try {
    const rslt = await pool.query(
      'INSERT INTO systemuser (fname, lname, tel, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING fname, userid',
      [fname, lname, tel, email, hashedPwd]
    );
    return rslt.rows[0];
  } catch (err) {
    console.log(err);
    // throw new Error('Insert fail');
    // return next(new AppError('Error inserting user', 400));
    return 'error';
  }
};

const hashPassword = async (pwd) => {
  const password = pwd;
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};