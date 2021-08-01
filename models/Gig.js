const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./db');

class Gig extends Model {}

Gig.init(
  {
    // Model attributes are defined here
    gigId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    gigType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gigTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gigDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minOrderAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM('kg', 'g', 'pcs'),
      defaultValue: 'kg',
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sold: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    gigDuration: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Gig', // We need to choose the model name
  }
);

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
