const Machine = require("./Machine");
const GpsLog = require("./GPSLog");

/* ✅ DEFINE RELATIONSHIP */
Machine.hasMany(GpsLog, {
  foreignKey: "machineId",
});

GpsLog.belongsTo(Machine, {
  foreignKey: "machineId",
});

module.exports = {
  Machine,
  GpsLog,
};
