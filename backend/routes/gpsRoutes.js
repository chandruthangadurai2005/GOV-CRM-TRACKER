const express = require("express");
const router = express.Router();
const gpsController = require("../controllers/gpsController");
const { protect } = require("../middleware/authMiddleware");

/* ✅ EXACT FUNCTION NAME */
router.post("/", protect, gpsController.createGPSLog);

/* ✅ STATIC ROUTE FIRST */
router.get("/live", protect, gpsController.getLiveVehicles);

/* ✅ DYNAMIC ROUTE LAST */
router.get("/:machineId", protect, gpsController.getMachineLocation);


module.exports = router;
