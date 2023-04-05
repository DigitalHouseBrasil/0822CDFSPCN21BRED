const express = require('express');

const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');

require('./database');

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/categories', categoryRouter);

app.listen(8080);