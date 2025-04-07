const Round = require('../models/roundModel');

exports.createRound = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }
        const newRound = new Round({
            name, isActive
        });
        await newRound.save();
        res.status(201).json({ message: `Round saved with name ${name}`, data: newRound });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getRounds = async (req, res) => {
    try {
        const round = await Round.find().sort({ updatedAt: -1 });
        res.json(round);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.updateRound = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const { id } = req.params; // Get ID from request parameters

        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }

        // Find and update the Round
        const updatedRound = await Round.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true } // Return the updated document
        );

        if (!updatedRound) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ message: `Designation updated with name ${name}`, data: updatedRound });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Designation
exports.viewRound = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const round = await Round.findById(id);

        if (!round) {
            return res.status(404).json({ message: "Round not found." });
        }

        res.status(200).json({ data: round });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Round
exports.deleteRound = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedRound = await Round.findByIdAndDelete(id);

        if (!deletedRound) {
            return res.status(404).json({ message: "Skill not found." });
        }

        res.status(200).json({ message: "Skill deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};