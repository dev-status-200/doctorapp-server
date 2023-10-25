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
        images:{
            type:DataTypes.JSON 
        },
    })
    return Clinic
}