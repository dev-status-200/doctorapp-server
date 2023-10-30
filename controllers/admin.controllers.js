const Sequelize = require('sequelize');
const db = require("../models");
const Op = Sequelize.Op;

  

  exports.getAllClients = async (req, res) => {
    try {
      const result = await db.Clients.findAll();
      res.json({ status: "success", result: result });
    } catch (error) {
      res.status(400).json({ status: "error" });
    }
  };

  exports.getAllDoctors = async (req, res) => {
    try {
      const result = await db.Doctors.findAll();
      res.json({ status: "success", result: result });
    } catch (error) {
      res.status(400).json({ status: "error" });
    }
  };


  exports.getAllClinics = async (req, res) => {
    try {
      const result = await db.Clinic.findAll();
      res.json({ status: "success", result: result });
    } catch (error) {
      res.status(400).json({ status: "error" });
    }
  };
