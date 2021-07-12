const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! 😔😔 Shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// Connect to mongoose
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// for unhandled promise exceptions
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 😔😔 Shutting down..');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});



/*
  why this file
  // it's better to use express app in one file and other configs in another file
    - db configuration
    - error handling stuffs
    - env variables
 */
