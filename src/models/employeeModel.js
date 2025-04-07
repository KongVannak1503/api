const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId: { type: String, require: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    salutation: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    gender: { type: String },
    city: { type: String },
    phone: { type: String },
    address: { type: String },
    about: { type: String },
    skill: { type: String },
    rate: { type: String },
    maritalStatus: { type: String },
    businessAddress: { type: String },
    employeeType: { type: String },
    imgUrl: { type: String },
    joinDate: { type: Date },
    dob: { type: Date },
    language: {
        type: String
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
