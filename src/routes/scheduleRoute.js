const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/interviewScheduleController');

router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getSchedules);
router.get('/:id', scheduleController.viewSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
