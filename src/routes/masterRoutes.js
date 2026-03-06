const express = require("express");
const router = express.Router();

const masterController = require("../controllers/masterController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("Admin"), masterController.createMaster);

router.get("/:type", masterController.getMasters);

router.put("/:type/:id", protect, authorize("Admin"), masterController.updateMaster);

router.delete("/:type/:id", protect, authorize("Admin"), masterController.deleteMaster);

module.exports = router;