// multerConfig.js
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Set the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
    },
});

// Create the multer upload instance
const upload = multer({ storage });

module.exports = upload; // Export the upload instance
