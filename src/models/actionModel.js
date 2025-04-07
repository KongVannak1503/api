const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],  // Add custom error message
        unique: true
    },
    action: {
        type: [String],
        enum: ["read", "create", "update", "delete"],
        required: [true, "Action is required"] // Add custom error message
    }
}, { timestamps: true });

module.exports = mongoose.model("Action", ActionSchema);
