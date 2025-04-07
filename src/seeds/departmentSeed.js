// seed/departmentSeeder.js

const Department = require('../models/departmentModel'); // Adjust path as needed

const seedDepartment = async () => {
    const department = new Department({
        _id: new mongoose.Types.ObjectId('67c145fa7a43a9c49335046a'),
        name: 'Sale',
        isActive: true,
        createdAt: new Date('2025-02-28T05:13:30.929Z'),
        updatedAt: new Date('2025-02-28T05:13:30.929Z')
    });

    await department.save();
    console.log('Department seeded');
};

seedDepartment().catch(err => console.error(err));
