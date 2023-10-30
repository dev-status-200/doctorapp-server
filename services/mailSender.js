const { createTransport } = require('nodemailer');

const mailSender = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "doctorappwork@gmail.com",
    pass: "Qn5qcNRFO0pLADr9",
  },
});

module.exports = mailSender;