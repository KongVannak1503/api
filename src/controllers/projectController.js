const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { code, name, startDate, endDate, unlimited, categoryId, departmentId, clientId, summary, note, members, file, currency, budget, estimate } = req.body;

        const project = new Project({
            code,
            name,
            startDate,
            endDate,
            unlimited,
            categoryId,
            departmentId,
            clientId,
            summary,
            note,
            members,
            file,
            currency,
            budget,
            estimate
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("members");
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
        res.status(500).json("this is error");
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate("members");
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name, startDate, endDate, unlimited, categoryId, departmentId, clientId, summary, note, members, file, currency, budget, estimate } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { code, name, startDate, endDate, unlimited, categoryId, departmentId, clientId, summary, note, members, file, currency, budget, estimate },
            { new: true }
        );

        if (!updatedProject) return res.status(404).json({ error: "Project not found" });
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).json({ error: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};