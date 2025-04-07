const Action = require('../models/actionModel');
exports.createAction = async (req, res) => {
    try {

        // Ensure req.body is an array
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: "Invalid data format. Expecting an array." });
        }

        const insertedActions = await Action.insertMany(req.body, { ordered: false });

        res.status(201).json({
            message: "Actions created successfully",
            insertedActions
        });

    } catch (error) {
        console.error("Error inserting actions:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        if (error.code === 11000) {
            return res.status(400).json({ error: "Duplicate name detected." });
        }

        res.status(500).json({ error: error.message });
    }
};
// Get all roles
exports.getActions = async (req, res) => {
    try {
        const action = await Action.find();
        res.json({ data: action });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
