const checkAnswer = (resposta) => {
    switch (resposta) {
        case 'jeferson-thiago':
            return {
                title: 'Boa! Isso aí...',
                description: 'Se bem que essa era fácil.',
                action: 'Gostei. Quero responder denovo.'
            };
            break;
        case 'patati-patata':
            return {
                title: 'Engraçado...',
                description: 'Se é pra brincar e se divertir, tudo bem. Mas pra aprender programação, não.',
                action: 'Tá bom. Vou responder sério.'
            };
            break;
        case 'rosa-rosinha':
            return {
                title: 'Ah, é?',
                description: 'Quando estiver lá no fundo azul na noite da floresta, não nos chame!!',
                action: 'Vou responder denovo.'
            };
            break;            
    }
}

const controller = {
    response: (req, res) => {
        let sentAnswer = req.body.resposta;
        let message = checkAnswer(sentAnswer);  
        res.render('response', message)
    }
};

module.exports = controller;