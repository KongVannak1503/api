// seed/employeeSeeder.js

const Employee = require('../models/employeeModel'); // Adjust path as needed

const seedEmployee = async () => {
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId('67c144c7fe42ee05deb772e9'),
        employeeId: 'MS-14',
        role: new mongoose.Types.ObjectId('67c1453b0fc906f21901e5f6'),
        salutation: 'Mr',
        name: 'Vannak Julian',
        email: 'admin@gmail.com',
        password: '$2b$10$zfDr0Yv79.o5MbdbkwlZjeBDdzsu1pH9sNjbx7/7tDtZeOmDYrx5a', // already hashed
        designation: new mongoose.Types.ObjectId('67d6a05b8470b5615e2c4646'),
        department: new mongoose.Types.ObjectId('67c145fa7a43a9c49335046a'),
        gender: 'Male',
        city: 'cambodia',
        phone: '(325) 799-375-1',
        address: 'Siem Reap, Cambodia',
        about: 'I am Vannak Julian, a dedicated Sales Professional with a passion for …',
        skill: 'NodeJs, ReactJs',
        rate: '250',
        maritalStatus: 'Single',
        businessAddress: 'Siem Reap, Cambodia',
        employeeType: 'Full-Time',
        dob: new Date('2000-11-11'),
        language: 'Khmer',
        isActive: true,
        createdAt: new Date('2025-02-28T05:08:23.658Z'),
        updatedAt: new Date('2025-04-03T14:09:32.280Z'),
        imgUrl: 'uploads/1740719662158.jpg'
    });

    await employee.save();
    console.log('Employee seeded');
};

seedEmployee().catch(err => console.error(err));
