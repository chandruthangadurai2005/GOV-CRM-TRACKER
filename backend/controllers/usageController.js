const Usage = require("../models/Usage");
const Machine = require("../models/Machine");
const Farmer = require("../models/Farmer");

exports.createUsage = async (req, res) => {
  try {
    const { farmerId, machineId, startTime, endTime } = req.body;

    if (!farmerId || !machineId || !startTime || !endTime) {
      return res.status(400).json({
        message: "farmerId, machineId, startTime, endTime are required",
      });
    }

    // Check farmer
    const farmer = await Farmer.findByPk(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Check machine using machineId string
    const machine = await Machine.findOne({ where: { machineId } });
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    // Calculate total hours
    const start = new Date(startTime);
    const end = new Date(endTime);

    const totalMilliseconds = end - start;
    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    if (totalHours <= 0) {
      return res.status(400).json({ message: "Invalid time range" });
    }

    const usage = await Usage.create({
      farmerId: farmer.id,
      machineId: machine.id,
      startTime: start,
      endTime: end,
      totalHours,
    });

    res.status(201).json({
      message: "Usage recorded successfully",
      usage,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
