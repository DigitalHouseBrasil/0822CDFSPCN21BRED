const express = require('express');
const session = require('express-session');

const publicRouter = require('./routes/publicRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'kP^cNRg%E3HRRR@V',
    resave: true,
    saveUninitialized: false
}))

app.use('/', publicRouter);
app.use('/user', userRouter);

app.listen(80, () => console.log('Rodando na porta 80'));
