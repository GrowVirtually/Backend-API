const { check, validationResult } = require('express-validator');

exports.signUpValidate = [
  check('email', 'Invalid email address!')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check('phone')
    .matches(
      /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/
    )
    .withMessage('Invalid phone number!')
    .trim()
    .escape(),
  check('fname', 'Invalid first name!').isString().trim().escape(),
  check('lname', 'Invalid last name!').isString().trim().escape(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .trim()
    .escape(),
];

exports.errorHandle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ status: 'error', message: errors.array()[0].msg });
  }
  next();
};
