module.exports = function(request, response) {
  var name = request.query.name;

  response.render('greet-dynamic', {
    name: name
  });
};
