const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../associations/doctorAssociations");
const Op = Sequelize.Op;

exports.edit = async (req, res) => {
  try {
    db.Doctors.upsert({ ...req.body.doctor });

    if (Array.isArray(req.body.clinic) && req.body.clinic.length > 0) {
       req.body.clinic.forEach((x) => db.Clinic.upsert({ ...x }));
    }
    if (Array.isArray(req.body.education) && req.body.education.length > 0) {
      req.body?.education?.forEach((x) => db.Education.upsert({ ...x }));
    }
    if (Array.isArray(req.body.experience) && req.body.experience.length > 0) {
      req.body?.experience?.forEach((x) => db.Experience.upsert({ ...x }));
    }
    if (Array.isArray(req.body.services) && req.body.services.length > 0) {
      req.body?.services?.forEach((x) => db.Service.upsert({ ...x }));
    }
    if (
      Array.isArray(req.body.specialization) &&
      req.body.specialization.length > 0
    ) {
      req.body?.specialization?.forEach((x) =>
        db.Specialization.upsert({ ...x })
      );
    }

    if (Array.isArray(req.body.pricing) && req.body.pricing.length > 0) {
      req.body?.pricing?.forEach((x) => db.Pricing.upsert({ ...x }));
    }

    if (req.body.delete.services.length > 0) {
      await db.Service.destroy({ where: { id: req.body.delete.services } });
    }
    if (req.body.delete.clinic.length > 0) {
      await db.Clinic.destroy({ where: { id: req.body.delete.clinic } });
    }
    if (req.body.delete.specialization.length > 0) {
      await db.Specialization.destroy({
        where: { id: req.body.delete.specialization },
      });
    }
    if (req.body.delete.pricing.length > 0) {
      await db.Pricing.destroy({ where: { id: req.body.delete.pricing } });
    }
    if (req.body.delete.education.length > 0) {
      await db.Education.destroy({ where: { id: req.body.delete.education } });
    }
    if (req.body.delete.experience.length > 0) {
      await db.Experience.destroy({
        where: { id: req.body.delete.experience },
      });
    }

    res.json({ status: "success"});
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await db.Doctors.findOne({
      where: { id: req.headers.id },
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

exports.getTopDoctors = async (req, res) => {
  try {
    const result = await db.Doctors.findAll({
      attributes:['id', 'firstName', 'lastName', 'image'],
      include: [
        { 
          model: db.Specialization,
          attributes:['id', 'name'],
        },
      ],
    });
    res.json({ status: "success", result: result });
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};