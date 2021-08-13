'use strict';

const bcrypt = require('bcrypt');

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
    queryInterface.bulkInsert('Users', [
      {
        fname: 'John',
        lname: 'Doe',
        phone: '0772347724',
        email: 'example@example.com',
        password: await bcrypt.hash('test@123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fname: 'Kamal',
        lname: 'Perera',
        phone: '0772327724',
        email: 'sample@sample.com',
        password: await bcrypt.hash('test@123', 10),
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
    queryInterface.bulkDelete('Users', null, {}),
};
