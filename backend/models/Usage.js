const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Machine = require("./Machine");
const Farmer = require("./Farmer");

const Usage = sequelize.define("Usage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Relationships
Machine.hasMany(Usage, { foreignKey: "machineId" });
Farmer.hasMany(Usage, { foreignKey: "farmerId" });

Usage.belongsTo(Machine, { foreignKey: "machineId" });
Usage.belongsTo(Farmer, { foreignKey: "farmerId" });

module.exports = Usage;
