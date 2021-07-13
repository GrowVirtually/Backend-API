// Load Idea Model
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const pool = require('../models/db');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

exports.viewGigs = (req, res) => {
  console.log('These are gigs');
  res.status(201).send('these are gigs');
};

exports.test = async (req, res) => {
  await pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.allUsers = catchAsync(async (req, res, next) => {
  const users = await pool.query(
    'SELECT * FROM systemuser',
    (error, results) => {
      if (error) {
        return next(new AppError('Error retrieving users', 400));
      }
      res.status(200).json(results.rows);
    }
  );
});

exports.oneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const users = await pool.query(
    'SELECT * FROM systemuser WHERE userid = $1',
    [id],
    (error, results) => {
      if (error) {
        return next(new AppError('Error retrieving user', 400));
      }
      res.status(200).json(results.rows);
    }
  );
});

// create new systemuser
exports.createUser = catchAsync(async (req, res, next) => {
  const { tel, email, fName, lName, pwd } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pwd, salt, async (err, hash) => {
      if (err) throw err;
      const newPwd = hash;
      await pool.query(
        'INSERT INTO systemuser (fname, lname, tel, email, password) VALUES ($1, $2, $3, $4, $5)',
        [fName, lName, tel, email, newPwd],
        (error, results) => {
          if (error) {
            return next(new AppError('Error inserting user', 400));
          }
          res.status(200).json({
            success: true,
            message: 'Insert successful',
          });
        }
      );
    });
  });
});
