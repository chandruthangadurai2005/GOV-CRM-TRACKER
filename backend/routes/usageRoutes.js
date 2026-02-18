const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  authorize("operator"),
  usageController.createUsage
);


module.exports = router;
