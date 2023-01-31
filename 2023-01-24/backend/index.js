const express = require('express');
const cors = require('cors');
const fs = require('fs');

try {
    fs.readFileSync('./filmes.json');
} catch(error) {
    fs.writeFileSync('./filmes.json', '[]');
}

const router = require('./routes');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});