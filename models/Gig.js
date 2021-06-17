const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const GigSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minOrderAmount: {
    type: mongoose.Schema.Types.Double,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: mongoose.Schema.Types.Double,
    required: true,
  },
  stock: {
    type: mongoose.Schema.Types.Double,
    required: true,
  },
  sold: {
    type: mongoose.Schema.Types.Double,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Date,
    required: true,
  },
  location: {
    latitude: String,
    longitude: String,
    required: true,
  },
  growerId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

mongoose.model('gigs', GigSchema);
