const express = require('express');
const methodOverride = require('method-override');

const galleryRouter = require('./routes/galleryRouter');

const app = express();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'))


app.use('/', galleryRouter);

app.listen(80);