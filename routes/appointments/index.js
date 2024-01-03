const routes = require('express').Router();
const authController = require("../../controllers/appointment.controllers");

// Create Appointment
routes.post("/create", authController.createAppointment);

// Get User Appointment Only
routes.get("/getAppointmentById", authController.getAppointmentById);

// Get User Appointment Only
routes.get("/getAppointmentByDoctorId", authController.getAppointmentByDoctorId);

// Get Appointment by Doctor Id
routes.get("/getAppointmentByDoctorId", authController.getAppointmentByDoctorId);

module.exports = routes;