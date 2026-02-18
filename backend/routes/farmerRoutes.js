const express = require("express");
const router = express.Router();
const farmerController = require("../controllers/farmerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  authorize("admin", "operator"),
  farmerController.createFarmer
);


module.exports = router;
