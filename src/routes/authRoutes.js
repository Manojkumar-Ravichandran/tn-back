const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.get("/me", protect, authController.getProfile);

module.exports = router;