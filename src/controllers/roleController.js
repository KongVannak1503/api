const Role = require('../models/roleModel');
const mongoose = require('mongoose');

exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        if (!permissions || typeof permissions !== 'object') {
            return res.status(400).json({ error: 'Permissions must be an object' });
        }

        const role = new Role({ name, permissions });
        await role.save();

        res.status(201).json({ message: "Role created successfully", role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find().sort({ updatedAt: -1 });
        res.json({ data: roles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ error: "Role not found" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRole = async (req, res) => {
    const { id, name, permissions } = req.body;

    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid role ID' });
        }

        // Find the role and update
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name, permissions },
            { new: true } // Returns the updated document
        );

        if (!updatedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }

        res.status(200).json({ role: updatedRole });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Failed to update role' });
    }
};


// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: "Role not found." });
        }
        await Role.findByIdAndDelete(id);
        res.status(200).json({ message: "Role deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.checkRoleNameExists = async (req, res) => {
    const { name } = req.params;

    try {
        const role = await Role.findOne({ name });
        if (role) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking role name:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};