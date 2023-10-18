module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define("Admins", {
        name:{ 
            type:DataTypes.STRING 
        },
        username:{ 
            type:DataTypes.STRING 
        },
        password:{ 
            type:DataTypes.STRING 
        },
    })
    return Admins
}