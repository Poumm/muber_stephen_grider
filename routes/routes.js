const DriverController = require("../controllers/drivers_controller");

module.exports = app => {
  //Définition des routes

  app.get("/api", DriverController.gretting);

  app.post("/api/drivers", DriverController.create);
};
