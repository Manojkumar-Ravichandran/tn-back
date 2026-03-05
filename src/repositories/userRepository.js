const User = require("../models/User");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};