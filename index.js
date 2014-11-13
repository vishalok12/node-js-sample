var express = require('express');
var app = express();
var greetController = require('./controller/greet');

app.set('port', (process.env.PORT || 5000))

app.set('views', __dirname + '/templates');

// app.set('view engine', 'ejs');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/greet', greetController);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
