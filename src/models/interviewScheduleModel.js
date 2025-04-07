const mongoose = require("mongoose");

const InterviewScheduleSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication', required: true },
    roundId: { type: mongoose.Schema.Types.ObjectId, ref: 'Round', required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    interviewType: { type: String },
    startDate: { type: Date },
    startTime: { type: Date },
    commentInterviewer: { type: String },
    commentCandidate: { type: String },
    isNotify: { type: Boolean },
    remind: { type: Number },
    remindType: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("InterviewSchedule", InterviewScheduleSchema);
