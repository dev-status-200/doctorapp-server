const routes = require('express').Router();
const adminController = require("../../controllers/admin.controllers");

// Get Clients
routes.get("/getClients", adminController.getAllClients);

// Get Doctors
routes.get("/getDoctors", adminController.getAllDoctors);

// Get Clinics
routes.get("/getClinics", adminController.getAllClinics);

module.exports = routes;