const routes = require('express').Router();
const authController = require("../../controllers/appointment.controllers");

// Create Appointment
routes.post("/create", authController.createAppointment);

// Get User Appointment Only
routes.get("/getAppointmentById", authController.getAppointmentById);

module.exports = routes;