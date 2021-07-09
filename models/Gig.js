// const mongoose = require('mongoose');
//
// const { Schema } = mongoose;
//
// // Create Schema
// const GigSchema = new Schema({
//   type: {
//     type: String,
//     required: true,
//   },
//   // title: {
//   //   type: String,
//   //   required: true,
//   // },
//   // description: {
//   //   type: String,
//   //   required: true,
//   // },
//   // minOrderAmount: {
//   //   type: Number,
//   //   required: true,
//   // },
//   // unit: {
//   //   type: String,
//   //   required: true,
//   // },
//   // unitPrice: {
//   //   type: Number,
//   //   required: true,
//   // },
//   // stock: {
//   //   type: Number,
//   //   required: true,
//   // },
//   // sold: {
//   //   type: Number,
//   //   required: true,
//   // },
//   // img: {
//   //   type: String,
//   //   required: true,
//   // },
//   // timeStamp: {
//   //   type: Date,
//   //   default: Date.now,
//   // },
//   // duration: {
//   //   type: Date,
//   //   required: true,
//   // },
//   // location: {
//   //   type: {
//   //     latitude: String,
//   //     longitude: String,
//   //   },
//   //   required: true,
//   // },
//   // growerId: {
//   //   type: String,
//   //   required: true,
//   // },
// });
//
// mongoose.model('gigs', GigSchema);

const pool = require('./db');

const test = (request, response) => {
  pool.query('SELECT NOW()', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = { test };
