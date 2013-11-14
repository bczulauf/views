var express = require("express"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 6060;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
});

var todos = [
  {"item": "Get Milk", "done": "false"},
  {"item": "Finish App", "done": "false"}
];

app.post('/todo', function(req, res) {
  var todo = {};
  todo.item = req.body.item;
  todo.done = req.body.done;

  todos.push(todo)

  res.send(todo);
});

app.get('/todo', function(req, res) {
  var todoslist = [];

  for (var i=0; i<todos.length; i++) {
    todoslist.push(todos[i]);
  }
  res.send(todos);
});


var blockMap = {
	'1': {
		"name": "Form",
		"description": "Forms can contain form blocks like inputs and checkboxes. When a user clicks on a Form button, it sends the user responses to the app database where they are stored.",
		"createdBy" : "Ben Zulauf",
		"lastUpdate": "11/11/13",
		"content": "<moz-form></moz-form>",
		"preview": "<form-preview></form-preview>"
	}
}

var pagesMap = {
  '1': {
    "id": 1,
    "title": "Home",
    "content": "<navbar></navbar>"
  },
  '2': {
    "id": 2,
    "title": "Menu",
    "content": "<menulist></menulist>"
  }
};
var next_id = 3;

app.get('/pages', function(req, res) {
  var pages = [];

  for (var key in pagesMap) {
    pages.push(pagesMap[key]);
  }
  res.send(pages);
});

app.get('/pages/:id', function(req, res) {
  console.log('Requesting page with id', req.params.id);
  res.send(pagesMap[req.params.id]);
});

app.post('/pages', function(req, res) {
  var page = {};
  page.id = next_id++;
  page.title = req.body.title;
  page.content = "<navbar></navbar>";

  pagesMap[page.id] = page;

  res.send(page);
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');