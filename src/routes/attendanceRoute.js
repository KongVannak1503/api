const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.createAttendance);
// router.get('/', jobController.getJobs);
// router.get('/:id', jobController.viewJob);
// router.put('/:id', jobController.updateJob);
// router.delete('/:id', jobController.deleteJob);
// router.put('/status/:id', jobController.updateJobStatus);

module.exports = router;
