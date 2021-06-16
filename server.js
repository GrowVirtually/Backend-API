const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

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
