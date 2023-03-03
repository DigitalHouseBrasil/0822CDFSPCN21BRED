const router = require('express').Router();

const publicController = require('../controllers/publicController');

router.get('/', publicController.showLoginForm);
router.get('/user/register-form/', publicController.showRegisterForm);

module.exports = router;
