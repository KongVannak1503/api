const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// GET route to fetch uploaded images
router.get('/', (req, res) => {
    fs.readdir(path.join(__dirname, '../uploads'), (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to retrieve images' });
        }
        // Filter only image files if necessary (optional)
        const imageUrls = files
            .filter(file => /\.(jpg|jpeg|png|gif|avif)$/i.test(file)) // Adjust extensions as needed
            .map(file => `/api/uploads/${file}`);
        res.status(200).json(imageUrls);
    });
});

module.exports = router;
