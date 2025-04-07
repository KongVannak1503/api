const SubCategory = require('../models/suCategoryModel');

exports.createSubCategory = async (req, res) => {
    try {
        const { name, categoryId, isActive } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }
        const newSubCategory = new SubCategory({
            name, categoryId, isActive
        });
        await newSubCategory.save();
        await newSubCategory.populate('categoryId', 'name')
        res.status(201).json({ message: `SubCategory saved with name ${name}`, data: newSubCategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getSubCategories = async (req, res) => {
    try {
        const subCategory = await SubCategory.find().populate('categoryId', 'name').sort({ updatedAt: -1 });
        res.json(subCategory);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.updateSubCategory = async (req, res) => {
    try {
        const { name, categoryId, isActive } = req.body;
        const { id } = req.params; // Get ID from request parameters

        if (!name) {
            return res.status(400).json({ message: "Name required." });
        }

        // Find and update the SubCategory
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            { name, isActive },
            { new: true } // Return the updated document
        );

        if (!updatedSubCategory) {
            return res.status(404).json({ message: "Designation not found." });
        }
        await updatedSubCategory.populate('categoryId', 'name');
        res.status(200).json({ message: `Designation updated with name ${name}`, data: updatedSubCategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// View Designation
exports.viewSubCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const subCategory = await SubCategory.findById(id).populate('categoryId', 'name');

        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found." });
        }

        res.status(200).json({ data: subCategory });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Category
exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found." });
        }

        res.status(200).json({ message: "SubCategory deleted successfully." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};