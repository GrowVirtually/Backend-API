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
    queryInterface.bulkInsert('User_Gigs', [
      {
        gigId: 20,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 27,
        userId: 2,
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
    queryInterface.bulkDelete('User_Gigs', null, {}),
};
