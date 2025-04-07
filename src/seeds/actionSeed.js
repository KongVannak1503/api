const mongoose = require("mongoose");
const Action = require("../models/actionModel"); // Adjust the path to your model

const actions = [
    { _id: "67c1438a5e0b95b0fddceb37", name: "/dashboard", action: ["read"] },
    { _id: "67c1438a5e0b95b0fddceb38", name: "/users", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb39", name: "/roles", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb3a", name: "/payroll", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb3b", name: "/poster", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb3c", name: "/leave", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb3d", name: "/goal", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb3f", name: "/employees", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb40", name: "/designations", action: ["read", "create", "update", "delete"] },
    { _id: "67c1438a5e0b95b0fddceb41", name: "/departments", action: ["read", "create", "update", "delete"] },
    { _id: "67d0018fe075c6930925dfb7", name: "/category", action: ["read", "create", "update", "delete"] },
    { _id: "67d060a1c723c2907f16363a", name: "/skills", action: ["read", "create", "update", "delete"] },
    { _id: "67d111094984ba084dec439a", name: "/job-application", action: ["read", "create", "update", "delete"] },
    { _id: "67d7aedd22054452ace57b15", name: "/sub-category", action: ["read", "create", "update", "delete"] },
    { _id: "67d7e25822054452ace57b16", name: "/jobs", action: ["read", "create", "update", "delete"] },
    { _id: "67d7e9b122054452ace57b17", name: "/round", action: ["read", "create", "update", "delete"] },
    { _id: "67dfb4b07253c95edef0e66a", name: "/interview-schedule", action: ["read", "create", "update", "delete"] },
    { _id: "67e66e5868ae58d2f801186d", name: "/job-positions", action: ["read", "create", "update", "delete"] },
    { _id: "67e904e33381714fa48b5ac3", name: "/attendances", action: ["read", "create", "update", "delete"] },
    { _id: "67ef8059b9dae1f72ff50772", name: "/reports", action: ["read", "create", "update", "delete"] },
];

async function seedActions() {
    try {
        await mongoose.connect("mongodb://localhost:27017/your_db_name"); // change to your DB
        await Action.deleteMany({});
        await Action.insertMany(actions);
        console.log("✅ Actions seeded successfully!");
        mongoose.disconnect();
    } catch (err) {
        console.error("❌ Error seeding actions:", err);
    }
}

seedActions();
