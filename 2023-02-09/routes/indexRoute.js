const express = require('express');
const indexController = require('../controllers/indexController')

const router = express.Router();

router.get('/', indexController.index)

module.exports = router;