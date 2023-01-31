const { writeFileSync, readFileSync } = require('fs');
const { randomUUID } = require('crypto');

const router = require('express').Router();

router.post('/filmes', (req, res) => {
    const filme = req.body;
    const id = randomUUID();
    const filmes = JSON.parse(readFileSync('filmes.json'));
    filmes.push({ id, ...filme });
    writeFileSync('filmes.json', JSON.stringify(filmes));
    res.redirect(req.headers.referer);
});

router.get('/filmes', (req, res) => {
    const { id, titulo, genero, ano, nota } = req.query;
    
    let filmes = JSON.parse(readFileSync('filmes.json'));

    if (id) {
        filmes = filmes.filter(filme => filme.id === id);
    }

    if (titulo) {
        filmes = filmes.filter(filme => filme.titulo === titulo);
    }

    if (genero) {
        filmes = filmes.filter(filme => filme.genero === genero);
    }

    if (ano) {
        filmes = filmes.filter(filme => filme.ano === ano);
    }

    if (nota) {
        filmes = filmes.filter(filme => Number(filme.nota) >= Number(nota));
    }

    res.status(200).json(filmes);
});


module.exports = router;