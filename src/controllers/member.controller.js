const Member = require("../models/member.model");
const { validationResult } = require("express-validator");
const { errorFormat } = require("../utils/errorFormat");

const createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    return res.send(member);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).send({ message: "Id is invalid" });

    await Member.deleteOne({ id });

    return res.send(true);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { createMember, deleteMember };
