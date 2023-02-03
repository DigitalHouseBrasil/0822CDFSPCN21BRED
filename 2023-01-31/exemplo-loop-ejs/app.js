const express = require('express');

const app = express();


const produtos = [
    {
        nome: 'Teclado',
        descricao: 'Teclado legal',
        valor: '100,00'
    },
    {
        nome: 'Mouse',
        descricao: 'Mouse bonitinho',
        valor: '50,00'
    },
    {
        nome: 'Cadeira',
        descricao: 'Cadeira gamer',
        valor: '800,00'
    }
];

app.get('/', (req, res) => res.render('index', { produtos}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(80);