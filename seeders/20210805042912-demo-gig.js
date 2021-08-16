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
        gigCategory: 'vegetable',
        gigTitle: 'Carrot',
        gigDescription: 'For sale',
        minOrderAmount: '100.00',
        unit: 'kg',
        unitPrice: '50.00',
        stock: '100.00',
        sold: '2.34',
        expireDate: new Date('2021-09-13'),
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 1,
      },
      {
        gigType: 'post',
        gigCategory: 'vegetable',
        gigTitle: 'Raddish',
        gigDescription: 'For sale',
        minOrderAmount: '10.00',
        unit: 'g',
        unitPrice: '15.00',
        stock: '55.00',
        sold: '2.34',
        expireDate: new Date('2021-09-21'),
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 2,
      },
      {
        gigType: 'pre',
        gigCategory: 'fruit',
        gigTitle: 'Raddish',
        gigDescription: 'For sale',
        minOrderAmount: '110.00',
        unit: 'pcs',
        unitPrice: '1500.00',
        stock: '50.00',
        sold: '20.34',
        expireDate: new Date('2021-12-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: 1,
      },
      {
        gigType: 'post',
        gigCategory: 'fruit',
        gigTitle: 'Raddish',
        gigDescription: 'For sale',
        minOrderAmount: '100.00',
        unit: 'kg',
        unitPrice: '150.00',
        stock: '50.00',
        sold: '20.34',
        expireDate: new Date(),
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
