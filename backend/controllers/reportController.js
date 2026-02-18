const Usage = require("../models/Usage");
const Farmer = require("../models/Farmer");
const Machine = require("../models/Machine");
const { fn, col } = require("sequelize");

exports.getFarmerReport = async (req, res) => {
  try {
    const farmerId = req.params.id;

    const farmer = await Farmer.findByPk(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Get all usage records with machine info
    const usages = await Usage.findAll({
      where: { farmerId },
      include: [
        {
          model: Machine,
          attributes: ["machineId", "type", "district"]
        }
      ],
      order: [["startTime", "ASC"]],
    });

    // Calculate total hours overall
    let overallHours = 0;
    const machineSummary = {};

    usages.forEach((usage) => {
      overallHours += usage.totalHours;

      const mId = usage.Machine.machineId;

      if (!machineSummary[mId]) {
        machineSummary[mId] = {
          machineType: usage.Machine.type,
          district: usage.Machine.district,
          totalHours: 0
        };
      }

      machineSummary[mId].totalHours += usage.totalHours;
    });

    res.json({
      farmer: {
        id: farmer.id,
        name: farmer.name,
        village: farmer.village,
        contact: farmer.contact
      },
      totalUsageSessions: usages.length,
      overallHours: overallHours.toFixed(2),
      machineSummary,
      detailedUsage: usages
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
