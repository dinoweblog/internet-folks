const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    community: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "community",
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "role" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("member", memberSchema);
