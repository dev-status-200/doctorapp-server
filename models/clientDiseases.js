module.exports = (sequelize, DataTypes) => {
    const clientDiseases = sequelize.define("clientDiseases", {
        heart:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        intellectual:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        immunoDeficiency:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        kidney:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        lung:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        mental:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        sleep:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        muscular:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        neurological:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        ocular:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        skin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        strokes:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        autoImmune:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        bone:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        cancer:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        gastroIntestinal:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
    })
    return clientDiseases
}