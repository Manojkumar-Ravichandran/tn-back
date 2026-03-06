const templeService = require("../services/templeService");

const getTemples = async (req, res) => {
  try {
    const data = await templeService.getTemples(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingTemples = async (req, res) => {
  try {

    const data = await templeService.getPendingTemples(req.query);

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTempleBySlug = async (req, res) => {
  try {
    const temple = await templeService.getTempleBySlug(req.params.slug);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTemples = async (req, res) => {
  try {

    const temples = await templeService.getMyTemples(req.user._id);

    res.json(temples);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNearbyTemples = async (req, res) => {
  try {
    const temples = await templeService.getNearbyTemples(req.query);
    res.json(temples);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTemple = async (req, res) => {
  try {

    // Validate minimum images
    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message: "Minimum 3 temple images are required"
      });
    }

    if (req.files.length > 10) {
        return res.status(400).json({ message: "Maximum 10 images allowed" });
    }

    let location = req.body.location;

    if (location) {
    const coords = JSON.parse(location);

    location = {
        type: "Point",
        coordinates: coords
    };
    }

    const images = req.files.map(file => `/uploads/${file.filename}`);

    const temple = await templeService.createTemple({
      ...req.body,
      location,
      images
    }, req.user._id);

    res.status(201).json(temple);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const approveTemple = async (req, res) => {
  try {

    const temple = await templeService.approveTemple(
      req.params.id,
      req.user._id
    );

    res.json({
      message: "Temple approved",
      data: temple
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const rejectTemple = async (req, res) => {
  try {

    const temple = await templeService.rejectTemple(
      req.params.id,
      req.body.reason
    );

    res.json({
      message: "Temple rejected",
      data: temple
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTemples,
  getPendingTemples,
  getTempleBySlug,
  getMyTemples,
  getNearbyTemples,
  createTemple,
  approveTemple,
  rejectTemple
};