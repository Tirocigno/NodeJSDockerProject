var express = require('express');
var port = 3000;
var app = express();
var bodyParser = require('body-parser');

var todos = ['buy the milk', 'rent a car', 'feed the cat'];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(request,response){
	response.sendFile(__dirname + "/index.html");
});

app.get('/tasks', (request, response) => response.status(200).json(todos));

app.get('/tasks/:id', (request, response) => {
	var id = request.params.id;
	if (todos[id]){
		response.status(200).json(todos[id]);
	}else{
		response.status(404, 'The task is not found').send();
	}
});

app.post('/tasks/insert', (request, response) => {
	console.log("sono in post");
	var task=request.body.task;
	console.log(task);
	todos.push(task);
	response.sendFile(__dirname + "/ok.html");
});

app.get('/tasks/delete/:id', (request, response) => {
	var id = request.params.id;
	if(0 <= id && id < todos.length) {
		todos.splice(id, 1);
		response.sendFile(__dirname + "/ok.html");	
	}else{
		response.status(404, 'The task is not found').send();
	}
});


app.listen(port);
console.log('todo list API server started on: ' + port);
