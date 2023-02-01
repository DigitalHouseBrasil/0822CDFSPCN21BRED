// Importar os módulos usados no código
const express = require('express');


// Importar as rotas
const indexRouter = require('./routes/indexRouter');
const responseRouter = require('./routes/responseRouter');

// Configurar a aplicação
const app = express(); // Guarda a execução o express na variável app
const PORT = process.env.PORT || 80; // Usa a porta 80 se não houve outra configurada
app.use(express.json()); // Transforma a resposta do formulário em JSON
app.use(express.urlencoded({extended : true})); // Converte os caracteres da URL para UTF8


// Programar a lógica e as rotas
app.use('/', indexRouter);
app.use('/response', responseRouter);


// Subir a aplicação
app.listen(PORT, () => console.log(`Aplicação de pé na porta ${PORT}.`));