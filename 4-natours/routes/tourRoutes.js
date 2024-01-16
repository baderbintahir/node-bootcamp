const express = require("express");
const tourController = require("./../controllers/tourController");

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("./../controllers/tourController");

const router = express.Router();

router.param("id", tourController.checkID);

router.route("/").get(getAllTours).post(tourController.checkBody, createTour);

router.route("/:id").get(getTour).put(updateTour).delete(deleteTour);

module.exports = router;
