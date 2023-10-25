const { DataTypes } = require('sequelize');
const { Doctors, Clinic, Education, Experience, Service, Specialization, Pricing } = require("../models");

Doctors.hasMany(Clinic,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Clinic.belongsTo(Doctors);

Doctors.hasMany(Education,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Education.belongsTo(Doctors);

Doctors.hasMany(Experience,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Experience.belongsTo(Doctors);

Doctors.hasMany(Service,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Service.belongsTo(Doctors);

Doctors.hasMany(Specialization,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Specialization.belongsTo(Doctors);

Doctors.hasMany(Pricing,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Pricing.belongsTo(Doctors);

module.exports = { Pricing, Doctors, Clinic, Education, Experience, Service, Specialization }