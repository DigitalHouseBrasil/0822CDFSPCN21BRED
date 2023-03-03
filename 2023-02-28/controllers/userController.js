const userModel = require('../models/User');

function showForm (req, res) {
    res.render('form');
};

function login (req, res) {
    let sentForm = req.body;
    const validationResult = userModel.validateLogin(req);
    res.send(validationResult)
}

module.exports = {
    showForm,
    login
}