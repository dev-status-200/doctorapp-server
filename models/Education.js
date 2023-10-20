module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define("Education", {
        degree:{
            type:DataTypes.STRING 
        },
        institute:{
            type:DataTypes.STRING 
        },
        year:{
            type:DataTypes.STRING 
        },
    })
    return Education
}