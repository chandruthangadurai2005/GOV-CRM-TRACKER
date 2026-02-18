const Farmer = require("../models/Farmer");

exports.createFarmer = async (req, res) => {
  try {
    const { name, village, contact } = req.body;

    if (!name || !village || !contact) {
      return res.status(400).json({
        message: "name, village, and contact are required",
      });
    }

    const farmer = await Farmer.create({
      name,
      village,
      contact,
    });

    res.status(201).json({
      message: "Farmer registered successfully",
      farmer,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
