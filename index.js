// Importing required packages and modules
const bodyParser = require('body-parser');
const express = require("express");
const morgan = require('morgan');
const db = require("./models");
const cors = require('cors');

// Creating an instance of the Express application
const app = express();

// Importing route modules
const doctorRoutes = require('./routes/doctors/');
const clientRoutes = require('./routes/client/');
const authRoutes = require('./routes/auth/');
const adminRoutes = require('./routes/admin/');

// Middleware setup
app.use(morgan('tiny')); // Logging middleware for request details
app.use(cors()); // Cross-Origin Resource Sharing for handling CORS issues

// Body parsing middleware with extended options and increased limit
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(express.json()); // JSON parsing middleware

// Syncing database models
db.sequelize.sync();

// Setting up basic route for root endpoint
app.get("/", (req, res) => {
  res.json('DocApp Server');
});

// Setting up modular routes for different features
app.use("/clients", clientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// Configuring the server to listen on a specific port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
