const DriverController = require("../controllers/drivers_controller");

module.exports = app => {
  //Définition des routes

  app.get("/api", DriverController.gretting);

  app.post("/api/drivers", DriverController.create);
  app.put("/api/drivers/:id", DriverController.edit);
  app.delete("/api/drivers/:id", DriverController.delete);
  app.get("/api/drivers", DriverController.index);
};
