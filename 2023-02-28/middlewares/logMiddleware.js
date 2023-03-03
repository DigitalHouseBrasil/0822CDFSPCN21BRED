function toConsole (req, res, next) {
    console.log('O usuário acessou a rota ' + req.url);
    next();
};

module.exports = {
    toConsole,
}