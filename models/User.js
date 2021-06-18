const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  fName: {
    type: String,
    required: [true, 'Please provide your first name'],
  },
  lName: {
    type: String,
    required: [true, 'Please provide your last name'],
  },
  tel: {
    type: String,
    required: [true, 'Please provide your telephone number'],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, 'Please provide your date of birth'],
  },
  nic: {
    type: String,
    required: [true, 'Please provide your NIC'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  gender: {
    type: String,
    enum: ['none', 'male', 'female'],
    required: true,
    default: 'none',
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please provide your street name'],
    },
    city: {
      type: String,
      required: [true, 'Please provide your city'],
    },
    postalCode: {
      type: String,
      required: [true, 'Please provide your postal code'],
    },
    required: [true, 'Please provide your address'],
  },
  location: {
    latitude: String,
    longitude: String,
  },
  bankDetails: {
    accNo: String,
    accHolder: String,
    bank: String,
    branchNo: Number,
  },
  photo: String,
  role: {
    type: String,
    enum: ['admin', 'grower', 'consumer'],
    default: 'consumer',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myGigs: [{ gigId: mongoose.Schema.objectId }],
  pwd: {
    type: String,
    minlength: 8,
    required: [true, 'Please provide a password'],
  },
  pwdConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
