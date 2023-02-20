const messagesModel = require('../models/messages')

const listMessages = (req, res) => {
    const messages = messagesModel.listMessages();
    res.render('list', {messages});
};

const createMessage = (req, res) => {
    const {text} = req.body;
    messagesModel.createMessage(text);
    res.redirect('/');
}

const deleteMessage = (req, res) => {
    const {id} = req.params;
    messagesModel.deleteMessage(id);
    res.redirect('/');
};

const formMessages = (req, res) => {
    const {id} = req.params;
    const messageToEdit = messagesModel.findMessage(id);
    res.render('edit', {message : messageToEdit})
}

const updateMessage = (req, res) => {
    const {id: idToUpdate, text: updatedMessage} = req.body;
    const teste = messagesModel.updateMessage(idToUpdate, updatedMessage);
    res.redirect('/')
}

module.exports = {
    listMessages,
    createMessage,
    deleteMessage,
    formMessages,
    updateMessage,
};