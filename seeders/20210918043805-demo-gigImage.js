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
    queryInterface.bulkInsert('GigImages', [
      {
        gigId: 1,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1631940246/rgnv25fy8km7z8votzwu.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 1,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1631940293/al5urbhaa4p9jvaeelva.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 2,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1631940293/al5urbhaa4p9jvaeelva.jpg',
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
    queryInterface.bulkDelete('GigImages', null, {}),
};
