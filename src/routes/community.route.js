const express = require("express");
const { body } = require("express-validator");
const {
  createCommunity,
  getAll,
  getAllMembers,
  getOwnerCommunity,
} = require("../controllers/community.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post(
  "/community",
  body("name")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars long"),
  authenticate,
  createCommunity
);
router.get("/community", getAll);
router.get("/community/:id/members", getAllMembers);
router.get("/community/me/owner", authenticate, getOwnerCommunity);

module.exports = router;
