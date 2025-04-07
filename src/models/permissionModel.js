const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Admin, Editor, Viewer, etc.
    permissions: {
        type: Map, // Store API routes as keys and allowed actions as values
        of: [String], // Example: { "/users": ["read", "update", "delete"] }
        default: {}
    }
});

module.exports = mongoose.model('Role', RoleSchema);
