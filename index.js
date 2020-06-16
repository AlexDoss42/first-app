const config = require('config');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
app.get('env');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(helmet());

console.log('Application Name: ' + config.get('name'));
console.log('Mail Sever: ' + config.get('mail.host'))

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
};

dbDebugger('Connected to the database...');

app.use(function(req, res, next){
  console.log("logging...");
  next();
})

const courses =[
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'}
]

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send([1,2[3]]);
});

app.get('/api/courses/:id', (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course with that id was not found")
  res.send(course);
});

app.post('/api/courses', (req, res) => {

  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) =>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with the given ID was not found');

  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status.length(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
return Joi.validate(req.body, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`It's over anakin. I have the ${port} port`));