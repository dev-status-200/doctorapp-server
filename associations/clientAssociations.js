const { DataTypes } = require('sequelize');
const { Relatives, clientDiseases, Clients } = require("../models");

Clients.hasMany(Relatives,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Relatives.belongsTo(Clients);

Clients.hasOne(clientDiseases,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
clientDiseases.belongsTo(Clients);

module.exports = { Relatives, clientDiseases, Clients }