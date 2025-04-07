const user = require('../models/userModel');  // Assuming you have a user model
const { ObjectId } = require('mongodb');

// Seed data for the user
const userSeed = {
    _id: new ObjectId("67d914b185beb95fb92b2a94"),
    username: "admin",
    password: "$2b$10$kn41xAUprk5y4BV0r0epquum0sHLkN.3KpYKzAcriZf9E.PvLPrqu",
    role: new ObjectId("67c1453b0fc906f21901e5f6"),
    employeeId: new ObjectId("67c144c7fe42ee05deb772e9"),
    isActive: true,
    createdAt: new Date("2025-03-18T06:37:37.072Z"),
    updatedAt: new Date("2025-03-18T06:37:37.072Z"),
    __v: 0
};

user.create(userSeed)
    .then(() => {
        console.log('User seed added successfully');
        process.exit();
    })
    .catch(err => {
        console.error('Error adding user seed:', err);
        process.exit(1);
    });
