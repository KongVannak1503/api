const mongoose = require("mongoose");

const JobPositionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model("JobPosition", JobPositionSchema);
