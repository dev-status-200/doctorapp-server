const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require("../associations/doctorAssociations");
const Op = Sequelize.Op;

exports.create = (req, res) => {
    try {
        console.log({"agree": true, "day": "1", "email": "sabdullah369@gmail.com", "firstName": "Abdullah ", "gender": "Male", "height": "6", "lastName": "Ejaz ", "month": "01", "phone": "03332209125", "weight": "45", "year": "2005"})
        res.json({status:"success"});
    } catch (error) {
        res.status(400).json({status:"error"});
    }
};
