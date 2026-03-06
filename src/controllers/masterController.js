const masterService = require("../services/masterService");

const createMaster = async (req, res) => {
  try {
    const { type, name } = req.body;

    const data = await masterService.createMaster(type, { name });

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMasters = async (req, res) => {
  try {
    const data = await masterService.getMasters(req.params.type);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMaster = async (req, res) => {
  try {
    const data = await masterService.updateMaster(
      req.params.type,
      req.params.id,
      req.body
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMaster = async (req, res) => {
  try {
    await masterService.deleteMaster(req.params.type, req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createMaster,
  getMasters,
  updateMaster,
  deleteMaster
};