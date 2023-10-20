module.exports = (sequelize, DataTypes) => {
    const Experience = sequelize.define("Experience", {
        hospitalName:{
            type:DataTypes.STRING 
        },
        from:{
            type:DataTypes.STRING 
        },
        to:{
            type:DataTypes.STRING 
        },
        designation:{
            type:DataTypes.STRING 
        },
    })
    return Experience
}