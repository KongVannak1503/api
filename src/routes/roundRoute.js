const express = require('express');
const router = express.Router();
const roundController = require('../controllers/roundController');

router.post('/', roundController.createRound);
router.get('/', roundController.getRounds);
router.get('/:id', roundController.viewRound);
router.put('/:id', roundController.updateRound);
router.delete('/:id', roundController.deleteRound);

module.exports = router;
