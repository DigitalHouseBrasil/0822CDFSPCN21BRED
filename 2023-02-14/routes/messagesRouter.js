const router = require('express').Router();

const messagesController = require('../controllers/messagesController');

router.get('/', messagesController.listMessages);
router.post('/create', messagesController.createMessage);
router.delete('/delete/:id', messagesController.deleteMessage);
router.post('/form/:id', messagesController.formMessages);
router.put('/edit', messagesController.updateMessage);

module.exports = router;