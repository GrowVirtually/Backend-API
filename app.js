const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./route_handlers/errorHandler');
const tourRouter = require('./routes/tourRoutes');

const gig = require('./routes/gigRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // prints readable req messages in console
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

//body-parser middleware
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// get access to the request body of a request object
app.use(express.json()); // body parser
app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true,
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
// route mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/gigs', gig);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
