const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
// const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./route_handlers/errorHandler');
const tourRouter = require('./routes/tourRoutes');

const gigRouter = require('./routes/gigRoutes');
const userRouter = require('./routes/userRoutes');
const consumerRouter = require('./routes/consumerRoutes');
const growerRouter = require('./routes/growerRoutes');

const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // prints readable req messages in console
}

// Limit requests from same IP
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
// reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // body parser
app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  cors({
    origin: `https://localhost:${process.env.PORT}`,
    credentials: true,
  })
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// image upload - cloudinary middleware
app.use(formData.parse());
cloudinary.config({
  cloud_name: process.env.IMG_CLOUD_NAME,
  api_key: process.env.IMG_API_KEY,
  api_secret: process.env.IMG_API_SECRET,
});

// ROUTES
// route mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/gigs', gigRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/consumers', consumerRouter);
app.use('/api/v1/growers', growerRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
