const express = require('express');
const { createAction, getActions } = require('../controllers/ActionController');
const router = express.Router();

router.post('/', createAction);
router.get('/', getActions);

module.exports = router;
