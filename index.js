const express = require('express');
const cors = require('cors');

const app = express();

//Middewares


// Index Route
app.get('/', (req, res) => {
  res.send('Welcome to GroVi');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
