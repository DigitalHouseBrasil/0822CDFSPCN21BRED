const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.post('/create', categoryController.createCategory);
router.get('/list', categoryController.listCategories);
router.get('/list/:id', categoryController.listCategory);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory)


module.exports = router;