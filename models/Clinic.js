module.exports = (sequelize, DataTypes) => {
    const Clinic = sequelize.define("Clinic", {
        name:{
            type:DataTypes.STRING 
        },
        address:{
            type:DataTypes.STRING 
        },
        email:{
            type:DataTypes.STRING 
        },
        active:{
            type:DataTypes.STRING,
        },
        images:{
            type:DataTypes.JSON 
        },
        longitude:{
            type: DataTypes.STRING,
            defaultValue: "0.0",
        },
        latitude:{
            type: DataTypes.STRING,
            defaultValue: "0.0",
        },
    })
    return Clinic
}