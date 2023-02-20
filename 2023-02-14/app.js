// Importa dependëncias
const express = require('express');
const methodOverride = require('method-override'); // Sobrescreve o método POST com DELETE e PUT

// Importa o único arquivo de rotas da aplicação
const messagesRouter = require('./routes/messagesRouter')

// Configurações
const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

// Coloca a rota em uso
app.use('/', messagesRouter)

// Sobe o servidor na porta 80
app.listen(80, () => console.log('Aplicação rodando na porta 80'));