const validationsMiddleware = require('../middlewares/validationsMiddleware')

const router = require('express').Router();

const userController = require('../controllers/userController')

router.get('/', userController.showForm);
router.post(
    '/user/login', 
    validationsMiddleware.loginValidations,
    userController.login
);

module.exports = router;