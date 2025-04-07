const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const uploadSingle = require('../middlewares/uploadFile');
const path = require('path');
const fs = require('fs');

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
    if (imagePath) {
        const filePath = path.join(__dirname, '../', imagePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

// Update User by ID (Handles Image Replacement)
exports.updateUser = async (req, res) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }

        try {
            const { id } = req.params;
            const { username, employeeId, password, role, isActive } = req.body;

            let user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User not found." });

            const existingUser = await User.findOne({
                $or: [{ username }],
                _id: { $ne: id }
            });
            if (existingUser) return res.status(400).json({ message: "Username  already taken." });

            // Hash password if provided
            let updatedPassword = user.password;
            if (password) {
                updatedPassword = await bcrypt.hash(password, 10);
            }

            // // Handle image update
            // let imageUrl = user.imgUrl;
            // if (req.file) {
            //     deleteImageFile(user.imgUrl); // Remove old image if exists
            //     imageUrl = `uploads/${req.file.filename}`;
            // }

            // Update user
            user = await User.findByIdAndUpdate(
                id,
                { username, employeeId, password: updatedPassword, role, isActive },
                { new: true }
            ).populate('role', 'name');

            res.status(200).json({ message: "User updated successfully", data: user });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Something went wrong. Please try again later." });
        }
    });
};

// Register User

exports.createUser = async (req, res) => {
    try {
        const { username, employeeId, password, role, isActive } = req.body;

        // Validate required fields
        if (!username || !password || !role || !employeeId) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken." });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Prepare user data
        const userData = {
            username,
            password: hashPassword,
            role,
            employeeId,
            isActive
        };

        // Add image URL if uploaded
        if (req.file) {
            userData.imgUrl = `uploads/${req.file.filename}`; // Save relative path of the image
        }

        const newUser = new User(userData);
        await newUser.save();
        await newUser.populate('role', 'name'); // Populate role before sending the response
        res.status(201).json({ message: 'User created successfully!', data: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user.', error });
    }
};


// Get all Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role', 'name').sort({ updatedAt: -1 });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('role', 'name');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Delete User (Deletes Associated Image)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });

        deleteImageFile(user.imgUrl); // Remove associated image if exists

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
exports.checkUsernameExists = async (req, res) => {
    const { username } = req.params;

    try {
        const employee = await User.findOne({ username });
        if (employee) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};