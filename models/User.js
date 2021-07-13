const pool = require('./db');

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
