const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

router.post('/', subCategoryController.createSubCategory);
router.get('/', subCategoryController.getSubCategories);
router.get('/:id', subCategoryController.viewSubCategory);
router.put('/:id', subCategoryController.updateSubCategory);
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;
