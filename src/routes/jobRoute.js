const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.createJob);
router.get('/', jobController.getJobs);
router.get('/:id', jobController.viewJob);
router.get('/view/:id', jobController.viewJobUpdate);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.put('/status/:id', jobController.updateJobStatus);

module.exports = router;
