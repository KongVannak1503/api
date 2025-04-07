const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    phone: { type: String },
    location: { type: String, required: true },
    currentLocation: { type: String },
    experience: { type: String },
    period: { type: String },
    applicationSource: { type: String },
    coverLetter: { type: String },
    status: { type: String },
    isEmail: { type: Boolean },
}, { timestamps: true });

module.exports = mongoose.model("JobApplication", SkillSchema);
