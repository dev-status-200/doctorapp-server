// Importing required packages and modules
const bodyParser = require('body-parser');
const express = require("express");
const morgan = require('morgan');
const db = require("./models");
const cors = require('cors');

// Creating an instance of the Express application
const app = express();

// const { Appointments, AppointmentServices } = require("./associations/appointmentAssociations")
// hellow rowlr
// Importing route modules
const appointments = require('./routes/appointments/');
const doctorRoutes = require('./routes/doctors/');
const clientRoutes = require('./routes/client/');
const adminRoutes = require('./routes/admin/');
const authRoutes = require('./routes/auth/');
const paymentRoutes = require('./routes/paymentRoutes');

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
app.use("/appointments", appointments);
app.use('/payments', paymentRoutes);
app.use("/clients", clientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

// Configuring the server to listen on a specific port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});