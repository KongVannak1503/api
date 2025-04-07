const Designation = require('../models/designationModel');
const { ObjectId } = require('mongodb');

// Seed data for the designation
const designationSeed = {
    _id: new ObjectId("67d6a05b8470b5615e2c4646"),
    name: "new",
    isActive: true,
    createdAt: new Date("2025-03-16T09:56:43.403+00:00"),
    updatedAt: new Date("2025-04-02T03:57:51.818+00:00"),
    __v: 0
};

// Insert the designation into the database
Designation.create(designationSeed)
    .then(() => {
        console.log('Designation seed added successfully');
        process.exit();  // Exit after seeding
    })
    .catch(err => {
        console.error('Error adding designation seed:', err);
        process.exit(1);  // Exit with error code
    });
