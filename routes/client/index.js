const routes = require('express').Router();
const clientController = require("../../controllers/client.controllers");

// Client create
routes.post("/create", clientController.create);


module.exports = routes;