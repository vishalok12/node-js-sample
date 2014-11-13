var express = require('express');
var app = express();
var greetController = require('./controller/greet');
var mongoose = require( 'mongoose' ); //MongoDB integration
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000))

app.set('views', __dirname + '/templates');

// app.set('view engine', 'ejs');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/greet', greetController);

// MongoDB for database interaction
var mongoUri = 'mongodb://localhost/todo_database';

//Connect to database
mongoose.connect( mongoUri );

//Schemas
var Todo = new mongoose.Schema({
  value: String,
  created_at: Date,
  updated_at: Date
});

//Models
var TodoModel = mongoose.model('Todo', Todo);

app.get('/api/todos', function(request, response, next) {
  TodoModel.find({}, function(err, todos) {
    if (err) {
      return next(e);
    }

    response.status(200).send(todos);
  });
});

app.post('/api/todos', function(request, response, next) {
  var currentTime = Date.now();

  var todo = new TodoModel({
    value: request.body.value,
    created_at: currentTime,
    updated_at: currentTime
  });

  todo.save( function( err ) {
    if( !err ) {
      return console.log( 'todo created' );
    } else {
      return next( err );
    }
  });

  return response.send( todo );
});

app.put('/api/todos/:id', function( request, response, next ) {
  return TodoModel.findById(request.params.id, function(err, todo) {
    todo.value = request.body.value;
    todo.updated_at = Date.now();

    return todo.save(function(err) {
      if(!err) {
        console.log( 'todo updated' );
      } else {
        next(err);
      }

      return response.send(todo);
    });
  });
});

//Delete todo
app.delete('/api/todos/:id', function( request, response, next ) {
  console.log( 'Deleting todo with id: ' + request.params.id );

  return TodoModel.findById(request.params.id, function(err, todo) {
    return todo.remove( function( err ) {
      if(!err) {
        console.log( 'todo removed' );
        return response.send('');
      } else {
        next(err);
      }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
