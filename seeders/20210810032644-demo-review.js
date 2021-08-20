'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkInsert('Reviews', [
      {
        content: 'Fresh organic foods',
        consumerId: 1,
        growerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Delivered on time',
        consumerId: 2,
        growerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) =>
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Reviews', null, {}),
};
