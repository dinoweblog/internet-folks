const express = require("express");
const { body } = require("express-validator");
const { createRole, getAll } = require("../controllers/role.controller");

const router = express.Router();

router.post(
  "/role",
  body("name")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars long"),
  createRole
);
router.get("/role", getAll);

module.exports = router;
