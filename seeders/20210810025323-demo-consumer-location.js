'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkInsert('ConsumerLocations', [
      {
        coordinates: db.sequelize.fn(
          'ST_MakePoint',
          '5.951957986708315',
          '80.54349562603379'
        ),
        userid: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        coordinates: db.sequelize.fn(
          'ST_MakePoint',
          '6.951957986708315',
          '81.54349562603379'
        ),
        userid: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: async (queryInterface, Sequelize) =>
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('ConsumerLocations', null, {}),
};
