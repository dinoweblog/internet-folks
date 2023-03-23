const express = require("express");

const authRoute = require("./routes/auth.route");
const roleRoute = require("./routes/role.route");
const communityRoute = require("./routes/community.route");
const memberRoute = require("./routes/member.route");

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("", roleRoute);
app.use("", communityRoute);
app.use("", memberRoute);

module.exports = app;
