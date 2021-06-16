const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  checkID,
  checkBody,
} = require('../route_handlers/tourHandler');

const router = express.Router();

// deprecated -> use alternative
// parameter middleware
router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour)
  .patch((req, res) => res.send('patched'));

router.route('/:id').get(getTour);

module.exports = router;
