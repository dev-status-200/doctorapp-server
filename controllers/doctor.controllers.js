const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../associations/doctorAssociations");
const Op = Sequelize.Op;

exports.edit = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.delete.services.length > 0) {
      await db.Service.destroy({ where: { id: req.body.delete.services } });
    }
    if (req.body.delete.specialization.length > 0) {
      await db.Specialization.destroy({ where: { id: req.body.delete.pricing } });
    }
    if (req.body.delete.pricing.length > 0) {
      await db.Pricing.destroy({ where: { id: req.body.delete.pricing } });
    }

    db.Doctors.upsert({ ...req.body.doctor });
    if (Array.isArray(req.body.clinic) && req.body.clinic.length > 0) {
      req.body.clinic.forEach((x) => db.Clinic.upsert({ ...x }));
    }
    req.body?.education?.forEach((x) => db.Education.upsert({ ...x }));
    req.body?.experience?.forEach((x) => db.Experience.upsert({ ...x }));
    req.body?.services?.forEach((x) => db.Service.upsert({ ...x }));
    req.body?.specialization?.forEach((x) =>
      db.Specialization.upsert({ ...x })
    );
    req.body?.pricing?.forEach((x) => db.Pricing.upsert({ ...x }));
    res.json({ status: "success" });
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
