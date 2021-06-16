// this is an example

exports.checkID = (req, res, next, val) => {
  // param middleware checks form id parameter validation
  if (req.params.id > 10) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.createTour = (req, res) => {
  console.log(req.body);
  res.status(201).send('done');
};

exports.getAllTours = (req, res) => {
  res.status(200).send('okaay');
};

exports.getTour = (req, res) => {
  res.status(200).send(`tour id is handled ${req.params.id}`);
};
