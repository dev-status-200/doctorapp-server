module.exports = (sequelize, DataTypes) => {
    const Pricing = sequelize.define("Pricing", {
        name:{
        type:DataTypes.STRING 
        },
        price:{
            type:DataTypes.STRING 
        },
    })
    return Pricing
}