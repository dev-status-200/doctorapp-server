module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define("Clients", {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    height: { type: DataTypes.STRING },
    weight: { type: DataTypes.STRING },
    approved: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
    married: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    children: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    childNo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    smoke: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    tobacco: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    alcohol: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
  });
  return Clients;
};
