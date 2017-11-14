const mongoose = require("mongoose");

const Driver = require("../models/driver");

module.exports = {
  gretting(req, res) {
    res.send({ hi: "there" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    //id est le nom du paramètre définit en tant que widcard dans l'url
    //il est possible d'avoir plusieurs paramètre dans l'url séparé par des /
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
