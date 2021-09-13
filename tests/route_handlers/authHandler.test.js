/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const db = require('../../models');
const app = require('../../app');

describe('testing login', () => {
  const thisDB = db;

  // beforeAll(async (seed) => {
  //   await thisDB.sequelize.sync({ force: true });
  // });

  it('should succeed when a user already exists', async () => {
    const email = 'sample@sample.com';
    const password = 'test@123';

    const response = await request(app).post('/api/v1/users/login').send({
      email,
      password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.user.token).not.toBeNull();
    expect(response.body.user.fname).toBe('Kamal');
    expect(response.body.user.lname).toBe('Perera');
    expect(response.body.user.email).toBe('sample@sample.com');
  });

  it('should fail when a no email already exists', async () => {
    const email = 'sample@sample.com';
    const password = 'test@123';

    await request(app).post('/api/v1/users/login').send({
      password,
    });

    // expect(response.statusCode).toBe(400);
    // expect(response.body.status).toBe('success');
    // expect(response.body.user.token).not.toBeNull();
    // expect(response.body.user.fname).toBe('Kamal');
    // expect(response.body.user.lname).toBe('Perera');
    // expect(response.body.user.email).toBe('sample@sample.com');
  });

  afterAll(async () => {
    await thisDB.sequelize.close();
  });
});

describe('testing protect middleware', () => {
  const thisDB = db;

  it('should give access to the protected route for the logged in user', async () => {
    const email = 'sample@sample.com';
    const password = 'test@123';

    const loggingResponse = await request(app)
      .post('/api/v1/users/login')
      .send({
        email,
        password,
      });

    const { token } = loggingResponse.body.user;

    // const response = await request(app)
    //   .get('api/v1/users/me')
    //   .set('Authorization', `Bearer ${token}`);
    //
    // expect(response.statusCode).toBe(201);
  }, 1000);

  afterAll(async () => {
    await thisDB.sequelize.close();
  });
});
