const routes = require('express').Router();
const adminController = require("../../controllers/admin.controllers");

// Get Clients
routes.get("/getClients", adminController.getAllClients);

// Get Doctors
routes.get("/getDoctors", adminController.getAllDoctors);

// Get Clinics
routes.get("/getClinics", adminController.getAllClinics);

// Delete Clients
routes.delete("/deleteClients", adminController.deleteClients);

// Delete Clients
routes.delete("/deleteClients", adminController.deleteClients);

// Approve Clients
routes.post("/approveClients", adminController.approveClients);

// Approve Doctors
routes.post("/approveDoctors", adminController.approveDoctors);

// Delete Doctors
routes.delete("/deleteDoctors", adminController.deleteDoctors);

// Delete Clinics
routes.delete("/deleteClinics", adminController.deleteClinics);

// Search Doctors
routes.get("/searchDoctor", adminController.searchDoctor)

// Search Clients
routes.get("/searchClient", adminController.searchClients)

// Search Clinics
routes.get("/searchClinics", adminController.searchClinics)


module.exports = routes;