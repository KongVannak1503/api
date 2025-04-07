const Job = require('../models/jobModel'); // Assuming 'jo' is the correct path to your model

exports.createJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        // if (!name || !skillId || !location || !employeeId) {
        //     return res.status(400).json({ message: "All required fields must be provided." });
        // }
        await newJob.save();

        res.status(201).json({ message: `Job Application saved`, data: newJob });
    } catch (error) {
        console.error("❌ Error creating job:", error);
        res.status(500).json({ message: error.message });
    }
};


// Get all Job Applications
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name')
            .populate('departmentId', 'name')
            .populate('skillId', 'name')
            .populate('interviewId', 'name')
            .populate({
                path: 'employeeId',
                select: 'name imgUrl designation',
                populate: {
                    path: 'designation',
                    select: 'name',
                }
            })
            .sort({ updatedAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { jobId } = req.params; // Get job ID from URL params
        const updateData = req.body; // Get job update data from request body

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Update the job
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        res.json({
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// View Job Application by ID
exports.viewJob = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const job = await Job.findById(id)
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name')
            .populate('departmentId', 'name')
            .populate('skillId', 'name')
            .populate('interviewId', 'name')
            .populate('employeeId', 'name');

        if (!job) {
            return res.status(404).json({ message: "Job Application not found." });
        }

        res.status(200).json({ data: job });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Job Application
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job Application not found." });
        }

        res.status(200).json({ message: "Job Application deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params; // Get ID from request parameters

        // Check if the status is provided
        if (!id) {
            return res.status(400).json({ message: "Status must be provided." });
        }

        // Find and update the Job document
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { status }, // Update only the status field
            { new: true } // Return the updated document
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json({ message: `Job updated with status ${status}`, data: updatedJob });
    } catch (error) {
        console.error("Error updating job status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};