const Skill = require('../models/skillModel');

exports.createSkill = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }
        const newSkill = new Skill({
            name, isActive
        });
        await newSkill.save();
        res.status(201).json({ message: `Skill saved with name ${name}`, data: newSkill });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getSkills = async (req, res) => {
    try {
        const skill = await Skill.find().sort({ updatedAt: -1 });
        res.json(skill);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.updateSkill = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const { id } = req.params; // Get ID from request parameters

        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }

        // Find and update the Skill
        const updatedSkill = await Skill.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true } // Return the updated document
        );

        if (!updatedSkill) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ message: `Designation updated with name ${name}`, data: updatedSkill });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Designation
exports.viewSkill = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found." });
        }

        res.status(200).json({ data: skill });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Skill
exports.deleteSkill = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedSkill = await Skill.findByIdAndDelete(id);

        if (!deletedSkill) {
            return res.status(404).json({ message: "Skill not found." });
        }

        res.status(200).json({ message: "Skill deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};