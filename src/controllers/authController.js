const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

// Register User
const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, password: hashPassword, role
        });
        await newUser.save();

        res.status(201).json({ message: `User registered with username ${username}` });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong. Error: ${error}` });
    }
};
// authController.js (loginUser method)
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const role = await Role.findOne({ _id: user.role });


        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found.` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: `Invalid credentials.` });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: `Your account is inactive. Please contact support.` });
        }

        // const permissions = await getPermissionsForRole(user.role); // Assuming a function that fetches permissions
        const token = jwt.sign({
            userId: user._id,
            empId: user.employeeId,
            name: user.username,
            role: role.name,
            permissions: role.permissions
        }, process.env.JWT_SECRET, { expiresIn: '5h' });


        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong. Error: ${error.message}` });
    }
};


module.exports = { registerUser, loginUser };
