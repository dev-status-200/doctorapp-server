const routes = require('express').Router();
const docController = require("../../controllers/doctor.controllers");

// Doctor Edit
routes.post("/edit", docController.edit);

// Doctor Get Profile
routes.get("/getProfile", docController.getProfile);

// Doctor Get Profile
routes.get("/getTopDoctors", docController.getTopDoctors);

// Get Doctor's Specialization List
routes.get("/getSpecialications", docController.getSpecialization);

// Get All Doctors
routes.get("/searchDoctors", docController.searchDoctors);

// Get All Doctors
routes.get("/getDoctorProfile", docController.getDoctorProfile);

module.exports = routes;