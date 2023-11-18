module.exports = (sequelize, DataTypes) => {
    const Specialities = sequelize.define("Specialities", {
        name:{
            type:DataTypes.STRING 
        },
        active:{
            type:DataTypes.STRING,
            defaultValue: "1"
        },
    })
    return Specialities
}