const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Clients } = require("../associations/clientAssociations");
const {
  Doctors,
  Specialization,
} = require("../associations/doctorAssociations");

const {
  Appointments,
  AppointmentServices,
} = require("../associations/appointmentAssociations");

const Op = Sequelize.Op;

exports.createAppointment = async (req, res) => {
  console.log(req.body);
  try {
    let data = { ...req.body };
    delete data.id;
    const result = await Appointments.create({
      ...data,
      otherName: data.otherDetails.name,
      otherGender: data.otherDetails.gender,
      otherAge: data.otherDetails.age,
      otherProblem: data.otherDetails.problem,
      DoctorId: req.body.id,
    });

    await req.body.services.forEach((x) => {
      let obj = { ...x };
      let newId = obj.id;
      delete obj.id;
      delete obj.createdAt;
      delete obj.updatedAt;
      AppointmentServices.create({
        ...obj,
        AppointmentId: result.id,
        PricingId: newId,
      });
    });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "error" });
  }
};

exports.getAppointmentById = async (req, res) => {
  console.log(req.headers);
  try {
    const result = await Appointments.findAll({
      where: {
        ClientId: req.headers.id,
        status: "1",
      },
      include: [
        {
          model: Doctors,
          attributes: ["firstName", "lastName"],
          include: [
            {
              model: Specialization,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    res.json({ status: "success", result: result });
  } catch (error) {
    res.json({ status: "error" });
  }
};

exports.getAppointmentByDoctorId = async (req, res) => {
  try {
    const result = await Appointments.findAll({
      where: {
        DoctorId: req.headers.id,
        status: "1",
      },
      include: [
        {
          model: Clients,
        },
        {
          model: AppointmentServices,
          include: [
            { model: db.Pricing }
          ],
        },
      ],
    });

    res.json({ status: "success", result: result });
  } catch (error) {
    res.json({ status: "error" });
  }
};

exports.getAppointmentByDoctorId = async(req, res) => {
  try {
    const result = await Appointments.findAll({
      where:{
        DoctorId:req.headers.id,
        status:'1',
      },
      include:[{
        model:Clients,
      }]
    });

    res.json({status:"success", result:result})
    
  } catch (error) {
    res.json({status:"error"})
  }
};
