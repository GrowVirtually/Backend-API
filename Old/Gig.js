const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../models/db');

const User = require('./User');

class Gig extends Model {}

Gig.init(
  {
    // Model attributes are defined here
    gigId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

// Gig - associations
User.hasMany(Gig, { foreignKey: 'userid', as: 'gigs' });

module.exports = Gig;
