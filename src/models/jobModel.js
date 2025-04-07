const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    skillId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true }],
    location: [{ type: String, required: true }],
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication', required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isEndDate: { type: Boolean },
    totalOpening: { type: String },
    status: { type: Boolean },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    isRemote: { type: Boolean },
    isDisclose: { type: Boolean },
    description: { type: String },

}, { timestamps: true });

module.exports = mongoose.model("Job", SkillSchema);
