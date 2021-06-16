const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['none', 'male', 'female'],
    required: true,
    default: 'none',
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    required: true,
  },
  location: {
    latitude: String,
    longitude: String,
    required: true,
  },
  bankDetails: {
    accNo: String,
    accHolder: String,
    bank: String,
    branchNo: Number,
  },
  profilePic: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'grower', 'consumer'],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: 0,
    required: true,
  },
  myGigs: [{ gigId: mongoose.Schema.objectId }],
  pwd: {
    type: String,
    required: true,
  },
});

mongoose.model('orders', UserSchema);
