// eslint-disable-next-line no-unused-vars
const { connect } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// Connect to mongoose
connect('mongodb://localhost/grovi', {
  useMongoClient: true,
})
  .then(() => console.log('MongoDB Connected (grovi)...'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/*
  why this file
  // it's better to use express app in one file and other configs in another file
    - db configuration
    - error handling stuffs
    - env variables
 */
