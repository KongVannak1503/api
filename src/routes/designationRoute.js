const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

router.post('/', designationController.createDesignation);
router.get('/', designationController.getDesignations);
router.get('/:id', designationController.viewDesignation);
router.put('/:id', designationController.updateDesignation);
router.put('/status/:id', designationController.updateStatus);
router.put('/statuses/:isActive', designationController.updateStatuses);
router.delete('/:id', designationController.deleteDesignation);

module.exports = router;
