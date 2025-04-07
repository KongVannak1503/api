const Department = require('../models/departmentModel');

exports.createDepartment = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }
        const newDepartment = new Department({
            name, isActive
        });
        await newDepartment.save();
        res.status(201).json({ message: `Department saved with name ${name}`, data: newDepartment });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getDepartments = async (req, res) => {
    try {
        const department = await Department.find().sort({ updatedAt: -1 });
        res.json(department);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.updateDepartment = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const { id } = req.params; // Get ID from request parameters

        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }

        // Find and update the Department
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true } // Return the updated document
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: "Department not found." });
        }

        res.status(200).json({ message: `Department updated with name ${name}`, data: updatedDepartment });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Department
exports.viewDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ message: "department not found." });
        }

        res.status(200).json({ data: department });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Designation
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedDepartment = await Department.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found." });
        }

        res.status(200).json({ message: "Department deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};