const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send([1,2[3]]);
});

app.listen(3000, () => console.log("It's over anakin. I have the high port"));