const mongoose = require("mongoose");

const { Schema } = mongooose;

const msgSchema = new Schema({
  message: { type: String, required: true },
  timeSent: { type: Date, default: Date.now },
  sender: { type: String, required: true },
});

module.exports = mongoose.model("message", msgSchema);
