// Importing the Express Router module
const routes = require('express').Router();

// Importing the admin controller for handling admin-related actions
const adminController = require("../../controllers/admin.controllers");

// Route to get all clients
routes.get("/getClients", adminController.getAllClients);

// Route to get client by id
routes.get("/getClientById/:id", adminController.getClientById);

// Route to get all doctors
routes.get("/getDoctors", adminController.getAllDoctors);

// Route to get doctors by id
routes.get("/getDoctorById/:id", adminController.getDoctorById);

// Route to get all clinics
routes.get("/getClinics", adminController.getAllClinics);

// Route to get client by id
routes.get("/getClinicById/:id", adminController.getClinicById);

// Route to delete clients
routes.delete("/deleteClients", adminController.deleteClients);

// Route to approve clients
routes.post("/approveClients", adminController.approveClients);

// Route to approve doctors
routes.post("/approveDoctors", adminController.approveDoctors);

// Route to delete doctors
routes.delete("/deleteDoctors", adminController.deleteDoctors);

// Route to delete clinics
routes.delete("/deleteClinics", adminController.deleteClinics);

// Route to create specialities
routes.post("/createSpeciality", adminController.createSpeciality);

// Route to search for doctors
routes.get("/searchDoctor", adminController.searchDoctor);

// Route to search for clients
routes.get("/searchClient", adminController.searchClients);

// Route to search for clinics
routes.get("/searchClinics", adminController.searchClinics);

// Exporting the configured routes
module.exports = routes;
