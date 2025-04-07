const mongoose = require("mongoose");

const RoundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Round", RoundSchema);
