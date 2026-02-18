const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Machine = sequelize.define("Machine", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  machineId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "inactive",
  },
});

module.exports = Machine;
