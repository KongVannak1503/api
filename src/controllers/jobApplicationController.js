const JobApplication = require('../models/jobApplicationModel'); // Assuming 'jo' is the correct path to your model

// Create Job Application
exports.createJobApplication = async (req, res) => {
    try {
        const { name, email, skillId, phone, location, currentLocation, experience, period, applicationSource, coverLetter, status, isEmail } = req.body;

        // Check if required fields are provided
        if (!name || !skillId || !location) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Create a new Job Application document
        const newJobApplication = new JobApplication({
            name,
            email,
            skillId,
            phone,
            location,
            currentLocation,
            experience,
            period,
            applicationSource,
            coverLetter,
            status,
            isEmail
        });


        // Save to the database
        await newJobApplication.save();

        // Populate the skillId field with the name
        await newJobApplication.populate('skillId', 'name');
        res.status(201).json({ message: `Job Application saved with name ${name}`, data: newJobApplication });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all Job Applications
exports.getJobApplications = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find().populate('skillId', 'name').sort({ updatedAt: -1 });
        res.json(jobApplications);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Job Application
exports.updateJobApplication = async (req, res) => {
    try {
        const { name, email, skillId, phone, location, currentLocation, experience, period, applicationSource, coverLetter, status, isEmail } = req.body;
        const { id } = req.params; // Get ID from request parameters

        // Check if required fields are provided
        if (!name || !email || !skillId || !phone || !location || !currentLocation || !experience || !period) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Find and update the JobApplication document
        const updatedJobApplication = await JobApplication.findByIdAndUpdate(
            id,
            {
                name,
                email,
                skillId,
                phone,
                location,
                currentLocation,
                experience,
                period,
                applicationSource,
                coverLetter,
                status,
                isEmail
            },
            { new: true } // Return the updated document
        );

        if (!updatedJobApplication) {
            return res.status(404).json({ message: "Job Application not found." });
        }

        res.status(200).json({ message: `Job Application updated with name ${name}`, data: updatedJobApplication });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Job Application by ID
exports.viewJobApplication = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const jobApplication = await JobApplication.findById(id);

        if (!jobApplication) {
            return res.status(404).json({ message: "Job Application not found." });
        }

        res.status(200).json({ data: jobApplication });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Job Application
exports.deleteJobApplication = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedJobApplication = await JobApplication.findByIdAndDelete(id);

        if (!deletedJobApplication) {
            return res.status(404).json({ message: "Job Application not found." });
        }

        res.status(200).json({ message: "Job Application deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateJobApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params; // Get ID from request parameters

        // Check if the status is provided
        if (!status) {
            return res.status(400).json({ message: "Status must be provided." });
        }

        // Find and update the JobApplication document
        const updatedJobApplication = await JobApplication.findByIdAndUpdate(
            id,
            { status }, // Update only the status field
            { new: true } // Return the updated document
        );

        if (!updatedJobApplication) {
            return res.status(404).json({ message: "Job Application not found." });
        }

        res.status(200).json({ message: `Job Application updated with status ${status}`, data: updatedJobApplication });
    } catch (error) {
        console.error("Error updating job application status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};