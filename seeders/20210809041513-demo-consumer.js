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
    queryInterface.bulkInsert('Consumers', [
      {
        userid: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 20,
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
    queryInterface.bulkDelete('Consumers', null, {}),
};
