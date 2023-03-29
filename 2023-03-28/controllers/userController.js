const Users = require('../models/Users')

function index (req, res) {
    res.send('O aplicativo está funcionando.')
};

async function createUser (req, res) {
    const { name, email } = req.body;
    const createdUser = await Users.create({ name, email });

    return res.json(createdUser);
};

async function listUsers (req, res) {
    const users = await Users.findAll();
    return res.json(users);
};

async function listUser (req, res) {};

async function updateUser (req, res) {};

async function deleteUser (req, res) {};

module.exports = {
    index,
    createUser,
    listUsers,
    listUser,
    updateUser,
    deleteUser
};