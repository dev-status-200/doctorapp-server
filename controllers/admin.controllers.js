const { Op } = require("sequelize");
const db = require("../models");

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

exports.getAllAdmins = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * limit;
  try {
    const totalItems = await db.Admins.count();
    const result = await db.Admins.findAll({
      offset: offset,
      limit: limit,
    });
    res.json({ status: "success", result: result, totalItems: totalItems });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const client = await db.Clients.findOne({ where: { id: id } });

    if (!client) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ result: client, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
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

exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.Doctors.findOne({
      where: { id: id },
      include: [
        { model: db.Clinic },
        { model: db.Education },
        { model: db.Experience },
        { model: db.Service },
        { model: db.Specialization },
        { model: db.Pricing },
      ],
    });
    res.json({ status: "success", result: result });
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

exports.getClinicById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const clinic = await db.Clinic.findOne({ where: { id: id } });

    if (!clinic) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ result: clinic, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
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
  const { approved, id } = req.body;
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
  try {
    const result = await db.Clients.destroy({
      where: { id: req.headers.id },
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

exports.createSpeciality = async (req, res) => {
  try {
    const result = await db.Specialities.create({
      ...req.body,
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.searchDoctor = async (req, res) => {
  const { searchterm } = req.headers;
  try {
    const result = await db.Doctors.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            lastName: {
              [Op.substring]: `%${searchterm}%`,
            },
          },

          {
            gender: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            email: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            address1: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            address2: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            state: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            country: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            city: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
        ],
      },
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.searchClients = async (req, res) => {
  const { searchterm } = req.headers;
  try {
    const result = await db.Clients.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.substring]: `${searchterm}`,
            },
          },
          {
            lastName: {
              [Op.substring]: `${searchterm}`,
            },
          },
          {
            weight: {
              [Op.substring]: `${searchterm}`,
            },
          },
          {
            email: {
              [Op.substring]: `${searchterm}`,
            },
          },
          {
            phone: {
              [Op.substring]: `${searchterm}`,
            },
          },
          {
            height: {
              [Op.substring]: `${searchterm}`,
            },
          },
        ],
      },
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.searchClinics = async (req, res) => {
  const { searchterm } = req.headers;
  try {
    const result = await db.Clinic.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: `%${searchterm}%`,
            },
          },
          {
            email: {
              [Op.substring]: `${searchterm}`,
            },
          },
        ],
      },
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.resetAdminCredentials = async (req, res) => {
  const { id, name, username, password } = req.body;
  console.log(req.body);
  try {
    if (password === "") {
      await db.Admins.update(
        {
          name: name,
          username: username,
        },
        { where: { id: id } }
      );
      const payload = {
        loginId: id,
        name: name,
        username: username,
      };
      res.json({ status: "success", payload: payload });
    } else {
      await db.Admins.update(
        {
          name: name,
          username: username,
          password: password,
        },
        { where: { id: id } }
      );
      const payload = {
        loginId: id,
        name: name,
        username: username,
      };
      res.json({ status: "success", payload: payload });
    }
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};
