const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const employeeRoute = require('./routes/employeeRoute');
const roleRoute = require('./routes/roleRoute');
const actionRoute = require('./routes/actionRoute');
const designationRoute = require('./routes/designationRoute');
const departmentRoute = require('./routes/departmentRoute');
const categoryRoute = require('./routes/categoryRoute');
const projectRoute = require('./routes/projectRoute');
const skillRoute = require('./routes/skillRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const jobApplicationRoute = require('./routes/jobApplicationRoute');
const jobRoute = require('./routes/jobRoute');
const scheduleRoute = require('./routes/scheduleRoute');
const roundRoute = require('./routes/roundRoute');
const jobPositionRoute = require('./routes/jobPositionRoute');
const attendanceRoute = require('./routes/attendanceRoute');

const imageRoute = require('./routes/uploadRoute');
const cors = require('cors'); // Import CORS
const path = require('path');
const upload = require('./middlewares/Upload');


// Connect to the database
dbConnect();

const app = express();

// Enable CORS for your React app's origin
app.use(cors({
    origin: 'http://localhost:5173', // React app
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow DELETE method
    credentials: true
}));


app.use(express.json()); // Middleware to parse JSON bodies



// Routes API
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/action", actionRoute);
app.use("/api/designations", designationRoute);
app.use("/api/departments", departmentRoute);
app.use("/api/category", categoryRoute);
app.use("/api/projects", projectRoute);
app.use("/api/skills", skillRoute);
app.use("/api/job-application", jobApplicationRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/sub-category", subCategoryRoute);
app.use("/api/round", roundRoute);
app.use("/api/interview-schedule", scheduleRoute);
app.use("/api/job-positions", jobPositionRoute);
app.use("/api/attendances", attendanceRoute);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});