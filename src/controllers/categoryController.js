const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }
        const newCategory = new Category({
            name, isActive
        });
        await newCategory.save();
        res.status(201).json({ message: `Category saved with name ${name}`, data: newCategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const category = await Category.find().sort({ updatedAt: -1 });
        res.json(category);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.updateCategory = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const { id } = req.params; // Get ID from request parameters

        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }

        // Find and update the Category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Designation not found." });
        }

        res.status(200).json({ message: `Designation updated with name ${name}`, data: updatedCategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Designation
exports.viewCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({ data: category });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found." });
        }

        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};