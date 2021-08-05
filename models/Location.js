const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./db');

const Gig = require('./Gig');

class Location extends Model {}

Location.init(
  {
    // Model attributes are defined here
    locationId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    coordinates: {
      type: DataTypes.GEOGRAPHY,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Location', // We need to choose the model name
  }
);

// Location - associations
Gig.hasMany(Location, { foreignKey: 'gigId', as: 'locations' });

module.exports = Location;
