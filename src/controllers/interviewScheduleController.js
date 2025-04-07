const Schedule = require('../models/interviewScheduleModel');

exports.createSchedule = async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        await newSchedule.save();
        const populatedSchedule = await Schedule.findById(newSchedule._id)
            .populate('jobId', 'name')          // Populating jobId with the job name
            .populate('roundId', 'name')        // Populating roundId with the round name
            .populate('interviewId', 'name')    // Populating interviewId with the interview name
            .populate('employeeId', 'imgUrl')   // Populating employeeId with the image URL
            .populate({
                path: 'employeeId',
                select: 'name imgUrl'         // Populating employeeId with both name and imgUrl
            });
        res.status(201).json({ message: `Schedule  saved`, data: populatedSchedule });
    } catch (error) {
        console.error("❌ Error creating Schedule:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getSchedules = async (req, res) => {
    try {
        const schedule = await Schedule.find()
            .populate('jobId', 'name')
            .populate('roundId', 'name')
            .populate('interviewId', 'name')
            .populate('employeeId', 'imgUrl')
            .populate('interviewId', 'name')
            .populate({
                path: 'employeeId',
                select: 'name imgUrl',
            })
            .sort({ updatedAt: -1 });
        res.json(schedule);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const updateData = req.body;
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: "Job not found" });
        }
        const updatedJob = await Job.findByIdAndUpdate(scheduleId, updateData, { new: true });

        res.json({
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.viewSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id)
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name')
            .populate('departmentId', 'name')
            .populate('skillId', 'name')
            .populate('interviewId', 'name')
            .populate('employeeId', 'name');

        if (!schedule) {
            return res.status(404).json({ message: "Job  not found." });
        }

        res.status(200).json({ data: schedule });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSchedule = await Schedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule  not found." });
        }

        res.status(200).json({ message: "Schedule  deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateScheduleStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Status must be provided." });
        }

        // Find and update the Job document
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { status },
            { new: true }
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