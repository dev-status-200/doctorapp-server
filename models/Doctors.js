module.exports = (sequelize, DataTypes) => {
    const Doctors = sequelize.define("Doctors", {
        firstName:{ 
            type:DataTypes.STRING 
        },
        lastName:{ 
            type:DataTypes.STRING 
        },
        email:{ 
            type:DataTypes.STRING 
        },
        password:{ 
            type:DataTypes.STRING 
        },
        phone:{ 
            type:DataTypes.STRING 
        },
        dob:{ 
            type:DataTypes.DATEONLY 
        },
        gender:{ 
            type:DataTypes.STRING 
        },
        image:{ 
            type:DataTypes.STRING 
        },
        bio:{ 
            type:DataTypes.TEXT 
        },


        address1:{ 
            type:DataTypes.TEXT 
        },
        address2:{ 
            type:DataTypes.TEXT 
        },
        state:{ 
            type:DataTypes.TEXT 
        },
        city:{ 
            type:DataTypes.TEXT 
        },
        postal:{ 
            type:DataTypes.TEXT 
        },
        country:{ 
            type:DataTypes.TEXT 
        },

        

        approved:{ 
            type:DataTypes.STRING 
        },
        verified:{ 
            type:DataTypes.STRING 
        },
        gmailId:{ 
            type:DataTypes.STRING,
        },
        gmail:{ 
            type:DataTypes.STRING,
            defaultValue:"0"
        },
        appleId:{ 
            type:DataTypes.STRING,
        },
        apple:{ 
            type:DataTypes.STRING,
            defaultValue:"0"
        },
    })
    return Doctors
}