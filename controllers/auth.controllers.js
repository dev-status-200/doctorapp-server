const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../models");
const {
  Relatives,
  clientDiseases,
  Clients,
} = require("../associations/clientAssociations");
const mailSender = require("../services/mailSender");

const Op = Sequelize.Op;

exports.login = (req, res) => {
  const { password, email } = req.headers;
  db.Doctors.findOne({ where: { email: email, password: password } })
    .then((data) => {
      if (data) {
        const payload = {
          username: `${data.firstName} ${data.lastName}`,
          loginId: `${data.id}`,  
        };
        jwt.sign(
          payload,
          "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
          { expiresIn: "12h" },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.json({
              status: "success",
              token: "BearerSplit" + token,
            });
          }
        );
      } else {
        return res.json({ status: "error" });
      }
    })
    .catch((err) => {
      res.json({
        status: "error",
        message:
          //err.message ||
          "Some error occurred while retrieving user.",
      });
    });
};

exports.loginAdmin = (req, res) => {
  const { password, username } = req.headers;
  db.Admins.findOne({where:{username:username, password:password}})
  .then(data => {
    if(data) {
      const payload = { username:`${data.username}`, loginId:`${data.id}`, name:`${data.name}` };
      jwt.sign(payload, 'qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm', {expiresIn:"12h"},
      (err, token) => {
        if(err) return res.json({message: err})
        return res.json({
          status:"success",
          token: "BearerSplit"+token,
          payload:payload
        })
      });
    } else { 
      return res.json({status:"error"}) 
    }
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving user."
    });
  });
};

exports.createAdmin = async (req, res)  => {
  try {
    const createAdmin = await db.Admins.create({...req.body})
    res.json({status:"success",admin:createAdmin});
  } catch (error) {
    res.status(400).json({status:"success"});
  }
};

exports.verifyToken = (req, res) => {
  res.json({ status: "success", isAuthorized: true });
};

exports.verify = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split("Split")[1];
  if (token) {
    jwt.verify(
      token,
      "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
      (err, decode) => {
        if (err) {
          return res.json({
            status: "error",
            isAuthorized: false,
            message: "Some Error Occured",
          });
        }
        req.user = {};
        req.user.id = decode.id;
        req.user.username = decode.username;
        next();
      }
    );
  } else {
    res.json({ status: "error" });
  }
};

exports.doctorSignUp = (req, res) => {
  try {
    db.Doctors.create({ ...req.body });
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "success" });
  }
};

exports.clientLogin = (req, res) => {
  const { password, email } = req.headers;
  Clients.findOne({ where: { email: email, password: password } })
    .then((data) => {
      if (data) {
        const payload = {
          username: `${data.firstName} ${data.lastName}`,
          loginId: `${data.id}`,
        };
        jwt.sign(
          payload,
          "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
          { expiresIn: "12h" },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.json({
              status: "success",
              token: "BearerSplit" + token,
              user: data.lastName,
              loginId: data.id,
            });
          }
        );
      } else {
        return res.json({ status: "error" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message:
          //err.message ||
          "Some error occurred while retrieving user.",
      });
    });
};

exports.clientOtpSend = async(req, res) => {
  try {
    const check = await Clients.findOne({
      where: { email: req.headers.email },
      attributes: ["id"],
    });
    if (check != null) {
      const password = (await Math.floor(Math.random() * 900000)) + 100000;
      await Clients.update({ password: password }, { where: { id: check.id } });
      const content = `<p>Dear User</p><p>Your OTP Code is</p><h1>${password}</h1><p>Never share this with anyone!</p><p>Regards</p><p>Doctor App Team</p>`;
      await mailSender.sendMail(
        {
          from: "doctorappwork@gmail.com",
          to: req.headers.email,
          subject: `Login Verification Code`,
          text: content,
        },
        function (error, info) {
          console.log(mailOptions);
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
      res.json({ status: "success" });
    } else {
      res.json({ status: "error", result: "No Email Exists" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};
