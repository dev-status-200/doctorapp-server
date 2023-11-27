module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("Location", {
        longitude:{
            type:DataTypes.STRING 
        },
        latitude:{
            type:DataTypes.STRING 
        },
    })
    return Location
}