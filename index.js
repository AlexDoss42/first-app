const config = require('config');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const Joi = require('joi');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
};

dbDebugger('Connected to the database...');

app.use(function(req, res, next){
  console.log("logging...");
  next();
})

app.get('/', function(req, res){
  res.render('index', {title: 'My Express APP', message: 'Hello there...'});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`It's over anakin. I have the ${port} port`));