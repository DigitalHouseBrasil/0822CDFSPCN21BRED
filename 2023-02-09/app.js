const express = require('express');
const indexRoute = require('./routes/indexRoute')


const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', indexRoute);

app.listen(80, () => console.log('Servidor funcionando na porta 80'))