module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        appointmentType:{ 
            type:DataTypes.STRING
        },
        other:{ 
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        otherName:{
            type:DataTypes.STRING
        },
        otherGender:{
            type:DataTypes.STRING
        },
        otherAge:{
            type:DataTypes.TEXT
        },
        otherProblem:{
            type:DataTypes.TEXT
        },
        total:{
            type:DataTypes.STRING
        },
        selectedDate:{
            type:DataTypes.DATE
        },
        selectHour:{
            type:DataTypes.STRING
        },
        payType:{
            type:DataTypes.STRING
        },
        status:{ 
            type:DataTypes.STRING,
            defaultValue: "1"
        },
    })
    return Appointments
}