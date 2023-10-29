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
        await db.clientDiseases.upsert({...req.body.disease, ClientId:result.id})
        await db.Relatives?.upsert({
            ...req.body.relatives,
            typeOfRelation:'spouse',
            ClientId:result.id,
            dob:moment(`${req.body.relatives.year}-${req.body.relatives.month}-${req.body.relatives.day}`)
        })
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
        const content = await `<p>Dear User</p><p>Your OTP Code is</p><h1>${password}</h1><p>Never share this with anyone!</p><p>Regards</p><p>Doctor App Team</p>`
        await mailSender.sendMail({
            from:'doctorappwork@gmail.com', to:req.body.client.email, subject:`Login Verification Code`, text:content
        }, function(error, info){
            console.log(mailOptions)
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        await res.json({status:"success"});
    } else {
        res.json({status:"email already exists!"});
    }

    } catch (error) {    
        res.status(400).json({status:"error"});
    }
};
