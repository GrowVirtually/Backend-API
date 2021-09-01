/* eslint-disable no-undef */
const request = require('supertest');
const db = require('../../models');
const app = require('../../app');

describe('testing login', () => {
  const thisDB = db;

  it('should succeed when a user already exists', async () => {
    const email = 'sample@sample.com';
    const password = 'test@123';

    const response = await request(app).post('/api/v1/users/login').send({
      email,
      password,
    });

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await thisDB.sequelize.close();
  });
});
