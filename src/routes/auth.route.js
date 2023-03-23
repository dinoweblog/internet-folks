const express = require("express");
const { signUp, signIn, getMe } = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", authenticate, getMe);

module.exports = router;
