const authService = require("../services/authService");

const loginUser = async (req, res) => {
  try {
    const data = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const data = await authService.getProfile(req.user._id);

    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getProfile,
};