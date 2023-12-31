const routes = require('express').Router();
const paymentController = require("../../controllers/payment.controllers");

// Dashboard User Login / Signin
routes.post("/intent", paymentController.createIntent);

module.exports = routes;