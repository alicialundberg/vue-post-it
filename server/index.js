var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');


//Middleware
app.use(bodyParser.json());
app.use(cors());

const todos = require('./routes/api/todo');

app.use('/api/todolist', todos);

// Handle production Heroku
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
 
