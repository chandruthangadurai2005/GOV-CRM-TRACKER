const { Machine, GpsLog } = require("../models");

exports.createGPSLog = async (req, res) => {
  try {
    const { machineId, latitude, longitude, engineStatus } = req.body;

    if (!machineId || !latitude || !longitude || engineStatus === undefined) {
      return res.status(400).json({
        message: "machineId, latitude, longitude, engineStatus are required",
      });
    }

    const machine = await Machine.findOne({ where: { machineId } });

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const log = await GpsLog.create({
      machineId: machine.id,   // ✅ IMPORTANT
      latitude,
      longitude,
      engineStatus,
    });

    res.json(log);
  } catch (error) {
    console.error("GPS ERROR:", error);   // ✅ Debug safety
    res.status(500).json({ message: "Server error" });
  }
};
exports.getLiveVehicles = async (req, res) => {
  try {
    console.log("🔥 /live API HIT");

    const machines = await Machine.findAll();
    console.log("🔥 MACHINES FOUND:", machines.length);

    const liveVehicles = [];

    for (const machine of machines) {
      console.log("➡ Checking machine:", machine.machineId, "DB id:", machine.id);

      const latestLog = await GpsLog.findOne({
        where: { machineId: machine.id },
        order: [["createdAt", "DESC"]],
      });

      console.log("   Latest log:", latestLog ? "FOUND" : "NONE");

      if (latestLog) {
        liveVehicles.push({
          machineId: machine.machineId,
          latitude: latestLog.latitude,
          longitude: latestLog.longitude,
          engineStatus: latestLog.engineStatus,
        });
      }
    }

    console.log("🔥 FINAL LIVE VEHICLES:", liveVehicles);

    res.json(liveVehicles);

  } catch (error) {
    console.error("🔥 LIVE VEHICLES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMachineLocation = async (req, res) => {
  try {
    const { machineId } = req.params;

    const machine = await Machine.findOne({
      where: { machineId },
      include: {
        model: GpsLog,
        limit: 1,
        order: [["createdAt", "DESC"]],
      },
    });

    res.json(machine);
  } catch (error) {
    console.error("LOCATION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
