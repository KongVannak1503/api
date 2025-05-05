const Employee = require('../models/employeeModel');
const uploadSingle = require('../middlewares/uploadFile');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { log } = require('console');

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
    if (imagePath) {
        const filePath = path.join(__dirname, '../', imagePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const { employeeId, password, isActive, salutation, name, email, designation, department, city, phone, gender, dob, language, address, about, skill, rate, employeeType, maritalStatus, businessAddress } = req.body;

        // if (!employeeId || !email || !password || !role) {
        //     return res.status(400).json({ message: "All required fields must be filled." });
        // }

        const hashPassword = await bcrypt.hash(password, 10);
        // Create a new employee record
        const newEmployee = new Employee({
            employeeId,
            salutation,
            name,
            email,
            password: hashPassword,
            designation,
            department,
            city,
            phone,
            gender,
            dob,
            language,
            address,
            about,
            skill,
            rate,
            employeeType,
            maritalStatus,
            businessAddress,
            isActive,
        });

        // Add imgUrl if an image is uploaded
        if (req.file) {
            const fileName = path.basename(req.file.path); // Get the file name
            newEmployee.imgUrl = `uploads/${fileName}`; // Save the relative path
        }

        await newEmployee.save(); // Save the employee to the database

        res.status(201).json({ message: 'Employee created successfully!', data: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Failed to create employee.', error });
    }
};

exports.updateEmployee = async (req, res) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err.message });
        }

        try {
            const { id } = req.params; // Get the employee ID from the request parameters

            // Prepare the update object with new values from the request body
            const updateData = {
                employeeId: req.body.employeeId,
                salutation: req.body.salutation,
                name: req.body.name,
                email: req.body.email,
                designation: req.body.designation,
                department: req.body.department,
                city: req.body.city,
                phone: req.body.phone,
                gender: req.body.gender,
                dob: req.body.dob,
                language: req.body.language,
                address: req.body.address,
                about: req.body.about,
                skill: req.body.skill,
                rate: req.body.rate,
                employeeType: req.body.employeeType,
                maritalStatus: req.body.maritalStatus,
                businessAddress: req.body.businessAddress,
                isActive: req.body.isActive,
            };

            // Handle image update
            if (req.file) {
                const employee = await Employee.findById(id);
                if (employee && employee.imgUrl) {
                    deleteImageFile(employee.imgUrl); // Remove old image if exists
                }
                updateData.imgUrl = `uploads/${req.file.filename}`; // Set the new image URL
            }

            // Hash password if provided
            if (req.body.password) {
                updateData.password = await bcrypt.hash(req.body.password, 10);
            }

            // Use findByIdAndUpdate to update the employee directly
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found.' });
            }

            res.status(200).json({ message: 'Employee updated successfully!', data: updatedEmployee });
        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ message: 'Failed to update employee.', error });
        }
    });
};





// Get all Users
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('department', 'name')
            .populate('designation', 'name')
            .sort({ updatedAt: -1 });
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Get User by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.status(200).json({ data: employee });
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Get User by ID
exports.viewEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id)
            .populate('department', 'name')
            .populate('designation', 'name');


        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.status(200).json({ data: employee });
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
// // Delete User (Deletes Associated Image)
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ message: "Employee not found." });

        deleteImageFile(employee.imgUrl); // Remove associated image if exists

        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
exports.checkIdExists = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findOne({ employeeId: id });
        if (employee) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking employeeId:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.checkEmailExists = async (req, res) => {
    const { email } = req.params;

    try {
        const employee = await Employee.findOne({ email });
        if (employee) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


exports.updateStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        const { id } = req.params;

        const updatedStatus = await Employee.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.status(200).json({ message: `Employee updated with status ${isActive}`, data: updatedStatus });
    } catch (error) {
        console.error("Error updating Employee status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};