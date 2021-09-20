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
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632113657/co97deb5ldzuxh1yuecv.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 1,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632113693/yjfkdxwffru15pt0lgey.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 1,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632113732/htxow11zdcjidoffwzmo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 2,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632114202/g7senjm2lofttoniq6bo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 2,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632114267/b2rn99mlyqkckd6sv8op.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 2,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632113732/htxow11zdcjidoffwzmo.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 3,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632115289/quirljv4gjpcjywwj0ze.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 3,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632115324/y9t8sqqzqoc3knwpnekl.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 4,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632115699/thtyrdrylr2szdcpqtbw.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 5,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632120014/woo1xycpu7x6opc5m4yw.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 6,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632120407/qncuxyypj1cfjhammcls.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gigId: 7,
        imgLink:
          'http://res.cloudinary.com/dslxbdvnz/image/upload/v1632120727/ix4z6u8wyhufrc5tknhg.jpg',
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
