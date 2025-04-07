const JobPosition = require('../models/jobPositionModel'); // Assuming 'jo' is the correct path to your model

exports.createJobPosition = async (req, res) => {
    try {
        const newJob = new JobPosition(req.body);
        await newJob.save();
        res.status(201).json({ message: `Job Position saved`, data: newJob });
    } catch (error) {
        console.error("❌ Error creating job position:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get all Job Applications
exports.getJobPositions = async (req, res) => {
    try {
        const jobs = await JobPosition.find()
            .sort({ updatedAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateJobPosition = async (req, res) => {
    try {
        const { id } = req.params; // Get job ID from URL params
        const { name, description, startDate, endDate, isActive } = req.body;

        // Check if job exists
        const jobPosition = await JobPosition.findById(id);
        if (!jobPosition) {
            return res.status(404).json({ message: "Job position not found" });
        }

        // Update job in database
        const updatedData = await JobPosition.findByIdAndUpdate(
            id,
            { name, description, startDate, endDate, isActive },
            { new: true, runValidators: true } // Return updated document
        );

        res.json({
            message: "Job updated successfully",
            data: updatedData,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// View Job Application by ID
exports.viewJobPosition = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const job = await JobPosition.findById(id);

        if (!job) {
            return res.status(404).json({ message: "Job position not found." });
        }

        res.status(200).json({ data: job });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Job Application
exports.deleteJobPosition = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedJob = await JobPosition.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job position not found." });
        }

        res.status(200).json({ message: "Job position deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateJobPositionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params; // Get ID from request parameters

        // Check if the status is provided
        if (!id) {
            return res.status(400).json({ message: "Status must be provided." });
        }

        // Find and update the Job document
        const updatedJob = await JobPosition.findByIdAndUpdate(
            id,
            { status }, // Update only the status field
            { new: true } // Return the updated document
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job position not found." });
        }

        res.status(200).json({ message: `Job updated with status ${status}`, data: updatedJob });
    } catch (error) {
        console.error("Error updating job status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};