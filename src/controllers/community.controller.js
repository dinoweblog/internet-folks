const Community = require("../models/community.model");
const Member = require("../models/member.model");
const { validationResult } = require("express-validator");
const { errorFormat } = require("../utils/errorFormat");

const createCommunity = async (req, res) => {
  try {
    const { _id } = req.user;
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: errorFormat(error.array()) });
    }

    const community = await Community.create({
      ...req.body,
      owner: _id,
    });
    return res.send(community);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const community = await Community.find().populate("owner", "_id name");
    return res.send(community);
  } catch (error) {
    return res.send(error);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).send({ message: "Id is invalid" });

    let meta = {};
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    const skip = (page - 1) * limit;

    const data = await Member.find({ slug: id })
      .skip(skip)
      .limit(limit)
      .populate("owner ", "_id name");

    const totalDoc = await Member.find({ slug: id }).countDocuments();
    meta.total = totalDoc;
    meta.pages = Math.ceil(totalDoc / limit);
    meta.page = page;

    return res.send({ meta, data });
  } catch (error) {
    return res.send(error);
  }
};

const getOwnerCommunity = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    let meta = {};
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    const skip = (page - 1) * limit;

    const data = await Community.find({ owner: id }).skip(skip).limit(limit);

    const totalDoc = await Community.find({ owner: id }).countDocuments();
    meta.total = totalDoc;
    meta.pages = Math.ceil(totalDoc / limit);
    meta.page = page;

    return res.send({ meta, data });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { createCommunity, getAll, getAllMembers, getOwnerCommunity };
