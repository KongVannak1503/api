const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    year: { type: String },
    month: { type: String },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    workFrom: { type: String, required: true },
    location: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    employeeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }], // Change here
    currentDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    isLate: { type: Boolean },
    isHalfDate: { type: Boolean },
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);

