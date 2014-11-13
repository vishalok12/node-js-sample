var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000))

app.set('views', __dirname + '/templates');

// app.set('view engine', 'ejs');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/greet', function(request, response) {
  var name = request.query.name;

  response.render('greet-dynamic', {
    name: name
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
