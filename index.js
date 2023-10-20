const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const db = require("./models");

const authRoutes = require('./routes/auth/');
const doctorRoutes = require('./routes/doctors/');

app.use(morgan('tiny'));
app.use(cors());

app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));
app.use(bodyParser.json({limit:'100mb', extended:true}));
app.use(express.json());
db.sequelize.sync();

const { Doctors, Clinic, Education, Experience, Service, Specialization } = require("./associations/doctorAssociations")

app.get("/", (req, res) => { res.json('Welcome To DocApp Server') });
app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => { console.log(`App listenings on port ${PORT}`) });