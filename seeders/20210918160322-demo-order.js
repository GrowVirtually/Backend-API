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
    queryInterface.bulkInsert('Orders', [
      {
        quantity: 200.03,
        paymentAmount: 513.22,
        deliveryMethod: 'self',
        growerId: 3,
        consumerId: 2,
        gigId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        quantity: 200.03,
        paymentAmount: 513.22,
        deliveryMethod: 'seller',
        growerId: 3,
        consumerId: 2,
        gigId: 1,
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
    queryInterface.bulkDelete('Orders', null, {}),
};
