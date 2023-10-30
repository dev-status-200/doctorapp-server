const routes = require('express').Router();
const authController = require("../../controllers/auth.controllers");

// Dashboard User Login / Signin
routes.get("/login", authController.login);

// Dashboard Admin Login
routes.get("/login_admin", authController.loginAdmin);

// Verify Dashboard User Login
routes.get("/verifyLogin", authController.verify, authController.verifyToken);

// SignUp Admin 
routes.post("/createAdmin", authController.createAdmin);

// Verify Dashboard User Login
routes.get("/verifyLogin", authController.verify, authController.verifyToken);


// Doctor Sign-up
routes.post("/doctorSignUp", authController.doctorSignUp);

module.exports = routes;