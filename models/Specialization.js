module.exports = (sequelize, DataTypes) => {
    const Specialization = sequelize.define("Specialization", {
        name:{
            type:DataTypes.STRING 
        },
    })
    return Specialization
}