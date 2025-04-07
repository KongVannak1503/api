const Role = require('../models/roleModel');
const { ObjectId } = require('mongodb');

// Seed data for the role
const roleSeed = {
    _id: new ObjectId("67c1453b0fc906f21901e5f6"),
    name: "Admin",
    permissions: {
        "/dashboard": ["read"],
        "/users": ["read", "create", "update", "delete"],
        "/roles": ["read", "create", "update", "delete"],
        "/payroll": ["read", "create", "update", "delete"],
        "/poster": ["read", "create", "update", "delete"],
        "/leave": ["read", "create", "update", "delete"],
        "/goal": ["read", "create", "update", "delete"],
        "/job-opening": ["read", "create", "update", "delete"],
        "/employees": ["read", "create", "update", "delete"],
        "/designations": ["read", "create", "update", "delete"],
        "/departments": ["read", "create", "update", "delete"],
        "/projects": ["read", "create", "update", "delete"],
        "/category": ["read", "create", "update", "delete"],
        "/skills": ["read", "create", "update", "delete"],
        "/job-application": ["read", "create", "update", "delete"],
        "/sub-category": ["read", "create", "update", "delete"],
        "/jobs": ["read", "create", "update", "delete"],
        "/round": ["read", "create", "update", "delete"],
        "/interview-schedule": ["read", "create", "update", "delete"],
        "/job-positions": ["read", "create", "update", "delete"],
        "/attendances": ["read", "create", "update", "delete"],
        "/reports": ["read", "create", "update", "delete"],
    },
    createdAt: new Date("2025-02-28T05:10:19.854+00:00"),
    updatedAt: new Date("2025-04-04T06:46:59.882+00:00"),
    __v: 0
};

Role.create(roleSeed)
    .then(() => {
        console.log('Role seed added successfully');
        process.exit();
    })
    .catch(err => {
        console.error('Error adding role seed:', err);
        process.exit(1);
    });
