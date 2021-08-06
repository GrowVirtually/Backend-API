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
    queryInterface.bulkInsert('Gigs', [
      {
        gigType: 'pre',
        gigTitle: 'Carrot',
        gigDescription: 'For sale',
        minOrderAmount: '100.00',
        unit: 'kg',
        unitPrice: '150.00',
        stock: '50.00',
        sold: '20.34',
        gigDuration: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 1,
      },
      {
        gigType: 'post',
        gigTitle: 'Raddish',
        gigDescription: 'For sale',
        minOrderAmount: '100.00',
        unit: 'kg',
        unitPrice: '150.00',
        stock: '50.00',
        sold: '20.34',
        gigDuration: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 2,
      },
    ]),
  down: async (queryInterface, Sequelize) =>
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Gigs', null, {}),
};
