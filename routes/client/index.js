const routes = require('express').Router();
const authController = require("../../controllers/client.controllers");

// Client create
routes.post("/create", authController.create);


module.exports = routes;