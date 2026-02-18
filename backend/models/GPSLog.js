const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GpsLog = sequelize.define("GpsLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  engineStatus: {          // ✅ THIS WAS MISSING
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  timestamp: {             // ✅ OPTIONAL BUT MATCHES DB
    type: DataTypes.DATE,
  },
});

module.exports = GpsLog;
