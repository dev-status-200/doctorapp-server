const Sequelize = require('sequelize');
const db = require("../models");
const Op = Sequelize.Op;


exports.getAdminProfile = async (req, res) => {
    try {
      const result = await db.Admins.findOne({
        where: { id: req.headers.id },
      });
      res.json({ status: "success", result: result });
    } catch (error) {
      res.status(400).json({ status: "error" });
    }
  };
  

  exports.getAllDoctors = async (req, res) => {
    try {
      const result = await db.Admins.findAll({
        where: { id: req.headers.id },
      });
      res.json({ status: "success", result: result });
    } catch (error) {
      res.status(400).json({ status: "error" });
    }
  };