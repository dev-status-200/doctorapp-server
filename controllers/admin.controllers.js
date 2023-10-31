const Sequelize = require("sequelize");
const db = require("../models");
const Op = Sequelize.Op;

exports.getAllClients = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;
  try {
    const totalItems = await db.Clients.count();
    const result = await db.Clients.findAll({
      offset: offset,
      limit: limit,
    });
    res.json({ status: "success", result: result, totalItems: totalItems });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.getAllDoctors = async (req, res) => {
  console.log(req.headers);
  const page = parseInt(req.headers.page) || 0;
  const limit = parseInt(req.headers.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;
  try {
    const totalItems = await db.Doctors.count();
    const result = await db.Doctors.findAll({
      offset: offset,
      limit: limit,
    });
    res.json({ status: "success", result: result, totalItems: totalItems });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.getAllClinics = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;
  try {
    const totalItems = await db.Clinic.count();
    const result = await db.Clinic.findAll({
      offset: offset,
      limit: limit,
    });
    res.json({ status: "success", result: result, totalItems: totalItems });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.approveDoctors = async (req, res) => {
  const { approved, id } = req.body;
  try {
    const result = await db.Doctors.update(
      { approved: approved },
      { where: { id: id } }
    );
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.approveClients = async (req, res) => {
  const {approved,id } = req.body;
  try {
    const result = await db.Clients.update(
      { approved: approved },
      { where: { id: id } }
    );
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.deleteClients = async (req, res) => {
  const { id } = req.headers;
  try {
    const result = await db.Clients.destroy({
      where: { id: id },
      force: true,
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.deleteDoctors = async (req, res) => {
  const id = req.headers.id;
  try {
    const result = await db.Doctors.destroy({
      where: { id: id },
      force: true,
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.deleteClinics = async (req, res) => {
  const { id } = req.headers;
  try {
    const result = await db.Clinic.destroy({
      where: { id: id },
      force: true,
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};
