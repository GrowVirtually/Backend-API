// Load Idea Model
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const pool = require('../models/db');

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
    // console.log(results);
    // return results.rows;
  });
};

// exports.allUsers = catchAsync(async (req, res, next) => {
//   // check if the user exists and pwd is correct
//   const users = await pool.query(
//     'SELECT * FROM systemuser',
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(results.rows);
//       // console.log(results);
//       // return results.rows;
//     }
//   );

// if (!user || !(await user.correctPwd(pwd, user.pwd))) {
//   return next(new AppError('Incorrect telephone or password', 401));
// }

// res.status(200).json({
//   status: 'success',
//   users,
// });
// });
