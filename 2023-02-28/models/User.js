const {validationResult} = require('express-validator')

function validateLogin (req) {
    const errors = validationResult(req);
    return errors
};

module.exports = {
    validateLogin
}