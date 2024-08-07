const express = require('express');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('./../controllers/tourController');

const router = express.Router();

// router.param("id", tourController.checkID);

router.route('/tour-stats').get(getTourStats);
router.route('/get-monthly-plan/:year').get(getMonthlyPlan);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).put(updateTour).delete(deleteTour);

module.exports = router;
