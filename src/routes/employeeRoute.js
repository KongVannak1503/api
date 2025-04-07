const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const checkPermission = require('../middlewares/rolePermission');
const employeeController = require('../controllers/employeeController');
const uploadSingle = require("../middlewares/uploadFile");

const router = express.Router();
router.use(verifyToken);

router.get("/", checkPermission, employeeController.getEmployees);
router.get("/:id", checkPermission, employeeController.getEmployeeById);
router.get("/view/:id", checkPermission, employeeController.viewEmployeeById);
router.post('/', checkPermission, uploadSingle, employeeController.createEmployee);
router.put('/:id', checkPermission, employeeController.updateEmployee);
router.delete('/:id', checkPermission, employeeController.deleteEmployee);
router.get('/check/:id', checkPermission, employeeController.checkIdExists);
router.get('/check/:email', checkPermission, employeeController.checkEmailExists);

module.exports = router;