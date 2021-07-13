// Load Idea Model
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const pool = require('../models/db');
const { body, validationResult } = require('express-validator');

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

// exports.createUser = catchAsync(async (req, res, next) => {
//   console.log('body data', req.body);
//   res.send(req.body);
// });

// create new systemuser
// exports.createUser = catchAsync(
//   body('email').isEmail().normalizeEmail(),
//   // body('password').isLength({
//   //   min: 6,
//   // }),
//   // body('fName').isAlpha(),
//   // body('lName').isAlpha(),
//   async (req, res, next) => {
//     // const { tel, email, fName, lName, pwd } = req.body;

//     // const users = await pool.query(
//     //   'SELECT * FROM systemuser WHERE userid = $1',
//     //   [id],
//     //   (error, results) => {
//     //     if (error) {
//     //       return next(new AppError('Error retrieving user', 400));
//     //     }
//     //     res.status(200).json(results.rows);
//     //   }
//     // );
//     const errors = validationResult(req);

//     // console.log('body data', req.body.email);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array(),
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       rslts: req.body,
//     });
//   }
// );

