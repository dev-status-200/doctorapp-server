module.exports = (sequelize, DataTypes) => {
    const Relatives = sequelize.define("Relatives", {
        firstName:{ type:DataTypes.STRING },
        lastName:{ type:DataTypes.STRING },
        dob:{ type:DataTypes.DATEONLY },
        disease:{ type:DataTypes.STRING },
        typeOfRelation:{ type:DataTypes.STRING },
    })
    return Relatives
}