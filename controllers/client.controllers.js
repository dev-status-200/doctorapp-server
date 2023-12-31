const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require("../associations/clientAssociations");
const Op = Sequelize.Op;
const moment = require("moment");
const mailSender = require("../services/mailSender");

exports.create = async(req, res) => {
    try {
    const check = await db.Clients.findOne({
        where:{email:req.body.client.email}
    });
    if(check==null){
        const password = await Math.floor(Math.random() * 900000) + 100000
        const result = await db.Clients.create({
            ...req.body.client,
            password:password,
            dob:moment(`${req.body.client.year}-${req.body.client.month}-${req.body.client.day}`)
        })
        await db.clientDiseases.upsert({...req.body.disease, ClientId:result.id});
        if(req.body.relatives.firstName!='' && req.body.relatives.day && req.body.relatives.month && req.body.relatives.year){
            await db.Relatives.upsert({
                ...req.body.relatives,
                typeOfRelation:'spouse',
                ClientId:result.id,
                dob:moment(`${req.body.relatives.year}-${req.body.relatives.month}-${req.body.relatives.day}`)
            })
        }
        if(req.body?.relatives?.children?.length>0){
            req.body.relatives.children.forEach((x)=>{
                db.Relatives.upsert({
                    ...x,
                    typeOfRelation:'child',
                    ClientId:result.id,
                    dob:moment(`${x.year}-${x.month}-${x.day}`)
                })
            })
        }
        await res.json({status:"success"});
    } else {
        res.json({status:"email already exists!"});
    }
    } catch (error) {
        console.log(error)
        res.status(400).json({status:"error"});
    }
};

exports.editClient = async(req, res) => {
    try {
        let clientId = req.body.client.id
        const result = await db.Clients.upsert({
            ...req.body.client,
            dob:moment(`${req.body.client.year}-${req.body.client.month}-${req.body.client.day}`)
        })
        db.clientDiseases.destroy({
            where:{ClientId:clientId}
        })
        db.Relatives.destroy({
            where:{ClientId:clientId}
        })
        await db.clientDiseases.upsert({...req.body.disease, ClientId:clientId});
        if(req.body.relatives.firstName!='' && req.body.relatives.day && req.body.relatives.month && req.body.relatives.year){
            await db.Relatives.upsert({
                ...req.body.relatives,
                typeOfRelation:'spouse',
                ClientId:clientId,
                dob:moment(`${req.body.relatives.year}-${req.body.relatives.month}-${req.body.relatives.day}`)
            })
        }
        if(req.body?.relatives?.children?.length>0){
            req.body.relatives.children.forEach((x)=>{
                db.Relatives.upsert({
                    ...x,
                    typeOfRelation:'child',
                    ClientId:clientId,
                    dob:moment(`${x.year}-${x.month}-${x.day}`)
                })
            })
        }
        await res.json({status:"success"});

    } catch (error) {
        console.log(error)
        res.status(400).json({status:"error"});
    }
};

exports.getClient = async(req, res) => {
    try {
      const client = await db.Clients.findOne({ 
        where: { id: req.headers.id },
        include:[
            {model:db.clientDiseases},
            {model:db.Relatives}
        ]
    });
  
      res.json({ result: client, status: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
};