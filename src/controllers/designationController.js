const Designation = require('../models/designationModel');

exports.createDesignation = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }
        const newDesignation = new Designation({
            name, isActive
        });
        await newDesignation.save();
        res.status(201).json({ message: `Designation saved with name ${name}`, data: newDesignation });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getDesignations = async (req, res) => {
    try {
        const designation = await Designation.find().sort({ updatedAt: -1 });
        res.json(designation);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.updateDesignation = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const { id } = req.params; // Get ID from request parameters

        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }

        // Find and update the designation
        const updatedDesignation = await Designation.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true } // Return the updated document
        );

        if (!updatedDesignation) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ message: `Designation updated with name ${name}`, data: updatedDesignation });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Designation
exports.viewDesignation = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const designation = await Designation.findById(id);

        if (!designation) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ data: designation });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Designation
exports.deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDesignation = await Designation.findByIdAndDelete(id);

        if (!deletedDesignation) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ message: "Designation deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        const { id } = req.params;

        const updatedStatus = await Designation.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ message: `Designation updated with status ${isActive}`, data: updatedStatus });
    } catch (error) {
        console.error("Error updating Designation status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateStatuses = async (req, res) => {
    try {
        const { ids, isActive } = req.body;

        // Validate the input
        if (!Array.isArray(ids) || ids.length === 0 || typeof isActive !== 'boolean') {
            return res.status(400).json({ message: "Invalid request data: 'ids' should be an array and 'isActive' should be a boolean." });
        }

        // Update the status while keeping the name field unchanged
        await Designation.updateMany(
            { _id: { $in: ids } },
            { $set: { isActive } }  // Only update `isActive` field
        );

        return res.status(200).json({ message: "Statuses updated successfully" });
    } catch (error) {
        console.error("Error updating designations:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


