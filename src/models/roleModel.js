const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: {
        type: Map, // Key-Value structure (e.g., "/users" => ["read", "update"])
        of: [String], // Array of actions (e.g., ["read", "update", "delete"])
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model("Role", RoleSchema);
