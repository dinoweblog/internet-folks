const Role = require("../models/role.model");
const { validationResult } = require("express-validator");
const { errorFormat } = require("../utils/errorFormat");

const createRole = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: errorFormat(error.array()) });
    }

    const role = await Role.create(req.body);
    return res.send(role);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.send(roles);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { createRole, getAll };
