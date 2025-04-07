const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const checkPermission = require('../middlewares/rolePermission');
const roleController = require('../controllers/roleController');

router.use(verifyToken);

router.post('/', checkPermission, roleController.createRole);
router.get('/', checkPermission, roleController.getRoles);
router.get('/:id', checkPermission, roleController.getRoleById);
router.put('/:id', checkPermission, roleController.updateRole);
router.delete('/:id', checkPermission, roleController.deleteRole);
router.get('/check/:name', checkPermission, roleController.checkRoleNameExists);

module.exports = router;
