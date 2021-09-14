/* eslint-disable no-undef */
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

const request = require('supertest');
const db = require('../../models');
const app = require('../../app');

describe('Testing create gig functionality', () => {
  const thisDB = db;

  // beforeAll(async () => {
  //   await thisDB.sequelize.sync({ force: true });
  // });

  it('Should create a new gig in the database', async () => {
    const response = await request(app)
      .post('/api/v1/gigs/')
      .send({
        gigType: 'pre',
        gigTitle: 'Carrot',
        gigCategory: 'vegetable',
        gigDescription: 'For immediate sale',
        minOrderAmount: '45.22',
        unit: 'kg',
        unitPrice: '100.00',
        stock: '30.22',
        sold: '38.22',
        gigDuration: '20',
        userid: 2,
        location: {
          lat: 6.933906500876093,
          lng: 79.8502538395318,
        },
      });

    expect(response.statusCode).toBe(201);
  });

  afterAll(async () => {
    await thisDB.sequelize.close();
  });
});
