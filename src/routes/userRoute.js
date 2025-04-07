const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const checkPermission = require('../middlewares/rolePermission');
const userController = require('../controllers/userController');
const uploadSingle = require("../middlewares/uploadFile");

const router = express.Router();
router.use(verifyToken);

router.get("/", checkPermission, userController.getUsers);
router.get("/:id", checkPermission, userController.getUserById);
router.post('/', checkPermission, uploadSingle, userController.createUser);
router.put('/:id', checkPermission, userController.updateUser);
router.delete('/:id', checkPermission, userController.deleteUser);
router.get('/check/:username', checkPermission, userController.checkUsernameExists);

module.exports = router;
