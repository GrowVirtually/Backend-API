/* eslint-disable */
const { app } = require('../../app');
const supertest = require('supertest');
const db = require('../../models');
const { request } = require('express');

it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

describe('Testing create gig functionality', () => {
  let thisDB = db;

  beforeAll(async () => {
    await thisDB.sequelize.sync({ force: true });
  });

  it('Should create a new gig in the database', async () => {
    // const newUser = await thisDB.User.create({
    //   fname: 'Asindu',
    //   lname: 'Chamika',
    //   phone: '+94717827167',
    //   email: 'asindu@gmail.com',
    //   password: 'test@123',
    // });
    // await newUser.save();

    const response = await request(app)
      .get('/api/v1/gigs/')
      .expect(200)
      .set({
        location: {
          lng: 80.54349562603379,
          lat: 5.951957986708315,
        },
      });

    expect(response.body).toMatchObject({
      status: 'success',
      results: 10,
      data: {
        gigs: [
          {
            id: 1,
            gigType: 'pre',
            gigCategory: 'vegetable',
            gigTitle: 'Carrot',
            gigDescription: 'For sale',
            minOrderAmount: '100.00',
            unit: 'kg',
            unitPrice: '50.00',
            stock: '100.00',
            sold: '2.34',
            expireDate: '2021-09-13',
            deliveryAbility: null,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 1,
            user: {
              id: 1,
              fname: 'John',
              lname: 'Doe',
              phone: '0772347724',
              dob: null,
              nic: null,
              email: 'example@example.com',
              gender: null,
              imgLink: null,
              role: 'user',
              customer: {
                id: 1,
                grower: {
                  id: 1,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 2,
            gigType: 'post',
            gigCategory: 'vegetable',
            gigTitle: 'Raddish',
            gigDescription: 'For sale',
            minOrderAmount: '10.00',
            unit: 'g',
            unitPrice: '15.00',
            stock: '55.00',
            sold: '2.34',
            expireDate: '2021-09-21',
            deliveryAbility: null,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 2,
            user: {
              id: 2,
              fname: 'Kamal',
              lname: 'Perera',
              phone: '0772327724',
              dob: null,
              nic: null,
              email: 'sample@sample.com',
              gender: null,
              imgLink: null,
              role: 'user',
              customer: {
                id: 2,
                grower: {
                  id: 2,
                  growerType: 'premium',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 11,
            gigType: 'post',
            gigCategory: 'vegetable',
            gigTitle: 'sem. Nulla interdum.',
            gigDescription: 'erat neque non quam. Pellentesque habitant',
            minOrderAmount: '20.61',
            unit: 'kg',
            unitPrice: '6227.25',
            stock: '4526.02',
            sold: '6481.41',
            expireDate: '2021-09-13',
            deliveryAbility: true,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 7,
            user: {
              id: 7,
              fname: 'Nicholas',
              lname: 'Matthew',
              phone: '099-1692293',
              dob: '2021-01-16',
              nic: '152877847O',
              email: 'non.cursus.non@MaurismagnaDuis.net',
              gender: 'male',
              imgLink:
                'tristique pellentesque, tellus sem mollis dui, in sodales elit erat',
              role: 'user',
              customer: {
                id: 7,
                grower: {
                  id: 7,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 12,
            gigType: 'post',
            gigCategory: 'vegetable',
            gigTitle: 'tincidunt nibh. Phasellus nulla.',
            gigDescription:
              'nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
            minOrderAmount: '3.11',
            unit: 'pcs',
            unitPrice: '2065.37',
            stock: '6652.82',
            sold: '7983.87',
            expireDate: '2021-12-11',
            deliveryAbility: true,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 9,
            user: {
              id: 9,
              fname: 'Francis',
              lname: 'Gavin',
              phone: '046-8945287',
              dob: '2022-03-09',
              nic: '683418735A',
              email: 'Quisque.ac.libero@nonsapienmolestie.edu',
              gender: 'none',
              imgLink:
                'montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod',
              role: 'user',
              customer: {
                id: 9,
                grower: {
                  id: 9,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 13,
            gigType: 'pre',
            gigCategory: 'vegetable',
            gigTitle: 'ornare tortor at risus.',
            gigDescription:
              'nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor.',
            minOrderAmount: '43.15',
            unit: 'kg',
            unitPrice: '6801.68',
            stock: '3214.89',
            sold: '254.80',
            expireDate: '2022-07-10',
            deliveryAbility: true,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 1,
            user: {
              id: 1,
              fname: 'John',
              lname: 'Doe',
              phone: '0772347724',
              dob: null,
              nic: null,
              email: 'example@example.com',
              gender: null,
              imgLink: null,
              role: 'user',
              customer: {
                id: 1,
                grower: {
                  id: 1,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 14,
            gigType: 'pre',
            gigCategory: 'vegetable',
            gigTitle: 'amet ante. Vivamus non',
            gigDescription:
              'condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc',
            minOrderAmount: '34.54',
            unit: 'pcs',
            unitPrice: '2892.28',
            stock: '8762.79',
            sold: '9260.34',
            expireDate: '2022-06-13',
            deliveryAbility: true,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 6,
            user: {
              id: 6,
              fname: 'Dalton',
              lname: 'Galvin',
              phone: '094-2213890',
              dob: '2020-09-24',
              nic: '372568452E',
              email: 'orci.Phasellus.dapibus@Cras.co.uk',
              gender: 'male',
              imgLink:
                'urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus',
              role: 'user',
              customer: {
                id: 6,
                grower: {
                  id: 6,
                  growerType: 'premium',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 15,
            gigType: 'pre',
            gigCategory: 'vegetable',
            gigTitle: 'et, rutrum non, hendrerit',
            gigDescription:
              'magna a neque. Nullam ut nisi a odio semper cursus.',
            minOrderAmount: '67.24',
            unit: 'g',
            unitPrice: '594.72',
            stock: '3457.02',
            sold: '3409.70',
            expireDate: '2022-05-18',
            deliveryAbility: true,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 1,
            user: {
              id: 1,
              fname: 'John',
              lname: 'Doe',
              phone: '0772347724',
              dob: null,
              nic: null,
              email: 'example@example.com',
              gender: null,
              imgLink: null,
              role: 'user',
              customer: {
                id: 1,
                grower: {
                  id: 1,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 16,
            gigType: 'pre',
            gigCategory: 'vegetable',
            gigTitle: 'Sed dictum. Proin eget',
            gigDescription: 'enim. Suspendisse aliquet, sem ut',
            minOrderAmount: '13.44',
            unit: 'kg',
            unitPrice: '3030.64',
            stock: '6905.11',
            sold: '6490.06',
            expireDate: '2022-01-04',
            deliveryAbility: false,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 2,
            user: {
              id: 2,
              fname: 'Kamal',
              lname: 'Perera',
              phone: '0772327724',
              dob: null,
              nic: null,
              email: 'sample@sample.com',
              gender: null,
              imgLink: null,
              role: 'user',
              customer: {
                id: 2,
                grower: {
                  id: 2,
                  growerType: 'premium',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 17,
            gigType: 'post',
            gigCategory: 'vegetable',
            gigTitle: 'Pellentesque ultricies dignissim',
            gigDescription:
              'gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales.',
            minOrderAmount: '19.83',
            unit: 'g',
            unitPrice: '553.36',
            stock: '8964.39',
            sold: '6749.94',
            expireDate: '2022-05-07',
            deliveryAbility: true,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 1,
            user: {
              id: 1,
              fname: 'John',
              lname: 'Doe',
              phone: '0772347724',
              dob: null,
              nic: null,
              email: 'example@example.com',
              gender: null,
              imgLink: null,
              role: 'user',
              customer: {
                id: 1,
                grower: {
                  id: 1,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
          {
            id: 20,
            gigType: 'post',
            gigCategory: 'vegetable',
            gigTitle: 'mollis vitae, posuere',
            gigDescription:
              'eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit',
            minOrderAmount: '68.11',
            unit: 'pcs',
            unitPrice: '2729.14',
            stock: '2300.63',
            sold: '1280.50',
            expireDate: '2022-05-12',
            deliveryAbility: false,
            coordinates: {
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326',
                },
              },
              type: 'Point',
              coordinates: [80.54349562603379, 5.951957986708315],
            },
            userid: 7,
            user: {
              id: 7,
              fname: 'Nicholas',
              lname: 'Matthew',
              phone: '099-1692293',
              dob: '2021-01-16',
              nic: '152877847O',
              email: 'non.cursus.non@MaurismagnaDuis.net',
              gender: 'male',
              imgLink:
                'tristique pellentesque, tellus sem mollis dui, in sodales elit erat',
              role: 'user',
              customer: {
                id: 7,
                grower: {
                  id: 7,
                  growerType: 'normal',
                  points: '0.00',
                  ratings: '0.0',
                  totalOrders: 0,
                },
              },
            },
          },
        ],
      },
    });
  });

  afterAll(async () => {
    await thisDB.sequelize.close();
  });
});
