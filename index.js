const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const db = require("./models");

const authRoutes = require('./routes/auth/');

app.use(morgan('tiny'));
app.use(cors());

app.use(bodyParser.urlencoded({limit:'100mb', extended:true}));
app.use(bodyParser.json({limit:'100mb', extended:true}));
app.use(express.json());
db.sequelize.sync();

app.get("/", (req, res) => { res.json('Welcome To DocApp Server') });
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => { console.log(`App listenings on port ${PORT}`) });