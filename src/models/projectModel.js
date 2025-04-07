const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    unlimited: { type: Boolean, default: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    departmentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    summary: { type: String, required: true },
    note: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    file: { type: String, required: true },
    currency: { type: String, required: true },
    budget: { type: String, required: true },
    estimate: { type: Number }

}, { timestamps: true });

module.exports = mongoose.model("Project", RoleSchema);
