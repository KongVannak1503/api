const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');

router.post('/', jobApplicationController.createJobApplication);
router.get('/', jobApplicationController.getJobApplications);
router.get('/:id', jobApplicationController.viewJobApplication);
router.put('/:id', jobApplicationController.updateJobApplication);
router.put('/status/:id', jobApplicationController.updateJobApplicationStatus);
router.delete('/:id', jobApplicationController.deleteJobApplication);

module.exports = router;
