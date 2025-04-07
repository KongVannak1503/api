const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const checkPermission = require('../middlewares/rolePermission');
const projectController = require('../controllers/projectController');

router.use(verifyToken);

router.post('/', checkPermission, projectController.createProject);
router.get('/', checkPermission, projectController.getAllProjects);
router.get('/:id', checkPermission, projectController.getProjectById);
router.put('/:id', checkPermission, projectController.updateProject);
router.delete('/:id', checkPermission, projectController.deleteProject);

module.exports = router;
