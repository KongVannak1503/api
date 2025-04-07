const express = require('express');
const router = express.Router();
const jobPositionController = require('../controllers/JobPositionController');

router.post('/', jobPositionController.createJobPosition);
router.get('/', jobPositionController.getJobPositions);
router.get('/:id', jobPositionController.viewJobPosition);
router.put('/:id', jobPositionController.updateJobPosition);
router.delete('/:id', jobPositionController.deleteJobPosition);
router.put('/status/:id', jobPositionController.updateJobPosition);

module.exports = router;
