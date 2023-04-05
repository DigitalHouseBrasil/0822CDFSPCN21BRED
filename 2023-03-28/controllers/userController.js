const Users = require('../models/Users')

async function createUser (req, res) {
    const { name, email, categoryId } = req.body;
    const createdUser = await Users.create({ name, email, categoryId });

    return res.json(createdUser);
};

async function listUsers (req, res) {
    const users = await Users.findAll({
        include: {
            association: 'member'
        }
    });
    return res.json(users);
};

async function listUser (req, res) {};

async function updateUser (req, res) {};

async function deleteUser (req, res) {};

module.exports = {
    createUser,
    listUsers,
    listUser,
    updateUser,
    deleteUser
};