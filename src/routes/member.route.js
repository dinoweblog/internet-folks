const express = require("express");
const {
  createMember,
  deleteMember,
} = require("../controllers/member.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/member", authenticate, createMember);
router.delete("/member", createMember);

module.exports = router;
