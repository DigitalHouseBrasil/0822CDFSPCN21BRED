const express = require('express');

const userRouter = require('./routes/userRouter');
const logMiddleware = require('./middlewares/logMiddleware');

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(logMiddleware.toConsole);

app.use('/', userRouter);

app.listen(80, () => console.log('Aplicativo rodando.'))