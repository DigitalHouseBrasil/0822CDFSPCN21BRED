const {check} = require('express-validator');

const loginValidations = [
    check('username').notEmpty().withMessage('O campo de usuário não pode ser vazio.'),
    check('username').isEmail().withMessage('O usuário deve ser um e-mail'),
    check('password').notEmpty().withMessage('A senha não pode ser em branco'),
];

module.exports = {
    loginValidations
}