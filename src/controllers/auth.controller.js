const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Snowflake } = require("@theinternetfolks/snowflake");

const generatedId = Snowflake.generate({
  timestamp: Date.parse(new Date()),
});

const newToken = (user) => {
  return jwt.sign({ user }, "abc");
};

const signUp = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    await User.create(req.body);

    return res.send(true);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Either Email or Password is incorrect" });
    }
    const match = user.checkPassword(password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Either Email or Password is incorrect" });
    }

    const token = newToken(user);

    return res.send({ user, token });
  } catch (error) {
    return res.send(error);
  }
};

const getMe = async (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { signUp, signIn, getMe };
