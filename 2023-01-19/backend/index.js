const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/cadastro', (req, res) => {
    console.log(req.body);
    res.send('Cadastrado!');
});

app.listen(3333, () => console.log('Rodando'));