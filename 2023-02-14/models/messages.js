const fs = require('fs');

const messagesPath = './databases/messages.json'

const readMessages = () => {
    const messagesBuffer = fs.readFileSync(messagesPath, 'utf8'); // Acessar o arquivo
    const messages = JSON.parse(messagesBuffer); // Converter o arquivo em JSON
    return messages; // Retornar o arquivo
};

const autoId = () => {
    const messages = readMessages();
    const messagesIds = messages.map(message => Number(message.id));
    const lastId = Math.max(...messagesIds);
    const nextId = messagesIds.length === 0 ? 0 : lastId + 1;
    return nextId;
};

const writeMessages = (messageToWrite) => {
    const stringifiedMessages = JSON.stringify(messageToWrite);
    fs.writeFileSync(messagesPath, stringifiedMessages, 'utf8')
}

const listMessages = () => {
    const messages = readMessages();
    return messages;
};

const createMessage = (newMessage) => {
    let messages = readMessages();
    const newId = autoId();
    messages.push({id: newId, text: newMessage})
    writeMessages(messages);
};

const deleteMessage = (idToDelete) => {
    let messages = readMessages();
    const messageToDelete = messages.find(message => message.id === Number(idToDelete));
    const indexToDelete =  messages.indexOf(messageToDelete);
    messages.splice(indexToDelete, 1);
    writeMessages(messages);
};

const findMessage = (idToFind) => {
    const messages = readMessages();
    const messageFound = messages.find(message => message.id === Number(idToFind));
    return messageFound;
}

const updateMessage = (idToUpdate, updatedMessage) => {
    let messages = readMessages();
    const messageToUpdate = messages.find(message => message.id === Number(idToUpdate));
    const messageIdToUpdate = messages.indexOf(messageToUpdate);
    messages[messageIdToUpdate].text = updatedMessage
    writeMessages(messages);
}

module.exports = {
    listMessages,
    createMessage,
    deleteMessage,
    findMessage,
    updateMessage
}