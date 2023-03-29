const express = require('express');

const userRouter = require('./routes/userRoter');
require('./database');

const app = express();

app.use(express.json());
app.use('/users', userRouter);

app.listen(8080);