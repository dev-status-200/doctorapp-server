const routes = require('express').Router();
const authController = require("../../controllers/doctor.controllers");

// Doctor Edit
routes.post("/edit", authController.edit);

// Doctor Get Profile
routes.get("/getProfile", authController.getProfile);

module.exports = routes;