const express = require("express");
const router = express.Router();
const machineController = require("../controllers/machineController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, machineController.createMachine);
router.get("/", protect, machineController.getAllMachines);
router.put("/:id", protect, machineController.updateMachine);
router.delete("/:id", protect, machineController.deleteMachine);

module.exports = router;
