const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const gig = require('./routes/gigRoutes');

const app = express();

// get access to the request body of a request object

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // prints readable req messages in console
}
app.use(express.json()); // body parser

app.use((req, res, next) => {
  console.log('Hello from the middleware!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
// route mounting
app.use('/api/v1/tours', tourRouter);
app.use('/gigs', gig);

module.exports = app;
