const Machine = require("../models/Machine");

/* ================= CREATE (User Allowed) ================= */
exports.createMachine = async (req, res) => {
  try {
    const { machineId, type, district } = req.body;

    if (!machineId || !type || !district) {
      return res.status(400).json({
        message: "machineId, type, and district are required",
      });
    }

    const isAdmin = req.user.role === "admin";

    const machine = await Machine.create({
  machineId,
  type,
  district,
  status: "active", 
});


    res.status(201).json({
      message: isAdmin
        ? "Vehicle created successfully"
        : "Vehicle submitted for approval",
      machine,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Machine ID already exists",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};


/* ================= GET ALL ================= */
exports.getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.findAll();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= APPROVE (Admin Only) ================= */
exports.approveMachine = async (req, res) => {
  try {
    const machine = await Machine.findByPk(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    machine.approvalStatus = "approved";
    machine.status = "active";
    await machine.save();

    res.json({
      message: "Machine approved successfully",
      machine,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE (Admin Only) ================= */
exports.updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findByPk(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const { type, district, status } = req.body;

    machine.type = type ?? machine.type;
    machine.district = district ?? machine.district;
    machine.status = status ?? machine.status;

    await machine.save();

    res.json({
      message: "Machine updated successfully",
      machine,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE (Admin Only) ================= */
exports.deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findByPk(req.params.id);

    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    await machine.destroy();

    res.json({ message: "Machine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
