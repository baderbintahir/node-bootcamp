const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next, val) => {
  if (!req.params.name || !req.params.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json(tours);
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === parseInt(req.params.id));
  res.status(200).json(tour);
};

exports.createTour = (req, res) => {
  const newTour = {
    ...req.body,
    id: tours.length + 1,
  };

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify([...tours, newTour]),

    (err) => {
      if (err) {
        res.status(501).json({
          status: "Error",
          message: "Unable to write to file",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            tour: newTour,
          },
        });
      }
    }
  );
};

exports.updateTour = (req, res) => {
  const filteredTours = tours.filter(
    (tour) => tour.id !== parseInt(req.params.id)
  );

  const updatedTour = req.body;

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify([...filteredTours, updatedTour]),
    (err) => {
      if (err) {
        res.status(501).json({
          status: "Error",
          message: "Unable to write to file",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            tour: updatedTour,
          },
        });
      }
    }
  );
};

exports.deleteTour = (req, res) => {
  const filteredTours = tours.filter(
    (tour) => tour.id !== parseInt(req.params.id)
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify([...filteredTours]),

    (err) => {
      if (err) {
        res.status(501).json({
          status: "Error",
          message: "Unable to delete the tour",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: "Tour deleted successfully",
        });
      }
    }
  );
};
