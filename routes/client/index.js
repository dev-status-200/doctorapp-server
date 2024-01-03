const routes = require('express').Router();
const clientController = require("../../controllers/client.controllers");

// Client create
routes.post("/create", clientController.create);

// get Client data for Editing
routes.get("/getClient", clientController.getClient);

// get Client data for Editing
routes.post("/editClient", clientController.editClient);

module.exports = routes;