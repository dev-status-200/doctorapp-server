const bodyParser = require('body-parser');
const express = require("express");
const morgan = require('morgan');
const db = require("./models");
const cors = require('cors');
const app = express();

const doctorRoutes = require('./routes/doctors/');
const clientRoutes = require('./routes/client/');
const authRoutes = require('./routes/auth/');
const adminRoutes = require('./routes/admin/');

app.use(morgan('tiny'));
app.use(cors());

app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));
app.use(bodyParser.json({limit:'100mb', extended:true}));
app.use(express.json());
db.sequelize.sync();

// const { Doctors, Clinic, Education, Experience, Service, Specialization } = require("./associations/doctorAssociations");
// const { Relatives, clientDiseases, Clients } = require("./associations/clientAssociations");

app.get("/", (req, res) => { res.json('DocApp Server') });
app.use("/clients", clientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => { console.log(`App listenings on port ${PORT}`) });