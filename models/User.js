const pool = require('./db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// DB CALLS //
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
  const { tel, email, fName, lName, pwd } = req.body;
  // body(req.body.email).isEmail().normalizeEmail();

  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(pwd, salt, async (err, hash) => {
        if (err) throw err;
        const newPwd = hash;
        const value1 = await pool.query(
          'INSERT INTO systemuser (fname, lname, tel, email, password) VALUES ($1, $2, $3, $4, $5)',
          [fName, lName, tel, email, newPwd]
        );
        return value1;
      });
    });
  } catch (err) {
    console.log(err);
  }
};
