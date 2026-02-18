const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Farmer = sequelize.define("Farmer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  village: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Farmer;
