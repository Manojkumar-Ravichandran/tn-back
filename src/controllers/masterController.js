const masterService = require("../services/masterService");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const createMaster = async (req, res) => {
  try {
    const { type, name } = req.body;
    const data = await masterService.createMaster(type, { name });
    return successResponse(res, `${type} created successfully`, data, 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getMasters = async (req, res) => {
  try {
    const data = await masterService.getMasters(req.params.type);
    return successResponse(res, "Masters retrieved successfully", data);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const updateMaster = async (req, res) => {
  try {
    const { type, id } = req.params;
    const data = await masterService.updateMaster(type, id, req.body);
    return successResponse(res, `${type} updated successfully`, data);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const deleteMaster = async (req, res) => {
  try {
    const { type, id } = req.params;
    await masterService.deleteMaster(type, id);
    return successResponse(res, `${type} deleted successfully`);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  createMaster,
  getMasters,
  updateMaster,
  deleteMaster
};