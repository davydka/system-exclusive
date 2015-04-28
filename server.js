var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);


app.use(express.static('public'));
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));


server.listen(process.env.PORT || 3000);


server.on('listening', function() {
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);

	var spawn = require('child_process').spawn
	spawn('open', ['http://localhost:'+server.address().port]);
});