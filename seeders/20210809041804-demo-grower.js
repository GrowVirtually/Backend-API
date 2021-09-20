'use strict';

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
    queryInterface.bulkInsert('Growers', [
      {
        userid: 2,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 3,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 4,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 5,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 6,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 7,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 8,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 9,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 10,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 11,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 12,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 13,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 14,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 15,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 16,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 17,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 18,
        growerType: 'premium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 19,
        growerType: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 20,
        growerType: 'premium',
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
    queryInterface.bulkDelete('Growers', null, {}),
};
