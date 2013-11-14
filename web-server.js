var express = require("express"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 6080;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
});

var componentsMap = {
  '1': {
    "id": 1,
    "name": "Button"
  },
  '2': {
    "id": 2,
    "name": "Slider"
  }
};
var next_id = 3;

app.get('/components', function(req, res) {
  var components = [];

  for (var key in componentsMap) {
    components.push(componentsMap[key]);
  }
  res.send(components);
});

app.get('/components/:id', function(req, res) {
  console.log('Requesting component with id', req.params.id);
  res.send(componentsMap[req.params.id]);
});

app.post('/components', function(req, res) {
  var component = {};
  component.id = next_id++;
  component.name = req.body.name;
  console.log(component.name)

  componentsMap[component.id] = component;

  res.send(component);
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');