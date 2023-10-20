const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require("../associations/doctorAssociations");
const Op = Sequelize.Op;

exports.edit = (req, res) => {

    try {
        db.Doctors.upsert({...req.body.doctor});
        req.body?.clinics?.forEach((x)=> db.Clinic.upsert({...x}) );
        req.body?.education?.forEach((x)=> db.Education.upsert({...x}) );
        req.body?.experience?.forEach((x)=> db.Experience.upsert({...x}) );
        req.body?.service?.forEach((x)=> db.Service.upsert({...x}) );
        req.body?.specialization?.forEach((x)=> db.Specialization.upsert({...x}) );
        res.json({status:"success"});
    } catch (error) {
        res.status(400).json({status:"error"});
    }
};

exports.getProfile = async(req, res) => {

    try {
        const result = await db.Doctors.findOne({
            where:{id:req.headers.id},
            include:[
                {model:db.Clinic},
                {model:db.Education},
                {model:db.Experience},
                {model:db.Service},
                {model:db.Specialization},
            ]
        });
        res.json({status:"success", result:result});
    } catch (error) {
        res.status(400).json({status:"error"});
    }
};