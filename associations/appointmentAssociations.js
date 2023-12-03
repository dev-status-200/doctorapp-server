const { DataTypes } = require('sequelize');
const { Clients, Doctors, Appointments, AppointmentServices, Pricing } = require("../models");

Clients.hasMany(Appointments,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Appointments.belongsTo(Clients);

Doctors.hasMany(Appointments,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Appointments.belongsTo(Doctors);

Appointments.hasMany(AppointmentServices,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
AppointmentServices.belongsTo(Appointments);

Pricing.hasMany(AppointmentServices,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
AppointmentServices.belongsTo(Pricing);

module.exports = { Appointments, AppointmentServices }