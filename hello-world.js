// Required libraries/variables
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');

// Configure the application (view options, port)
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false });
  app.set('view engine', 'ejs');
  app.set('port', 3001);
});

// Enable (static) public folder to include js and css files
app.use(express.static(path.join(__dirname, 'public')));

// Use components directory for socket-io-client library
app.use('/components', express.static(path.join(__dirname, 'components')));

// 
app.get('/', function(request, response){
  response.render('sample', { title: 'Hello World' });
});

// Make the server listen the port set above
server.listen(app.get('port'), function(){
   console.log("Express server listening on port " + app.get('port'));
});

// Start a Socket.IO listen
var io = require('socket.io').listen(server);

// Send/receive events
io.sockets.on('connection', function (socket) {
	console.log('Socket is open' + socket);
	
	// Sending an event to client-side
	socket.emit('server-side', { message: 'Hello World' });
	
	// Receiving an event from client-side
	socket.on('client-side', function (data) {
		console.log("Client-side sent: ");
		console.log(data);
	});
});