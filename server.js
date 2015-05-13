var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var pg = require('pg').native;
var bodyParser = require('body-parser');

var environment = process.env.NODE_ENV;

require('./api/v1/api-sysex.js')(app);
require('./api/v1/api-user.js')(app);


app.use(express.static('public'));



server.listen(process.env.PORT || 3000);


server.on('listening', function() {
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);

	if(environment == 'development'){
		//var spawn = require('child_process').spawn
		//spawn('open', ['http://localhost:'+server.address().port]);
	}
});


pg.connect(process.env.DATABASE_URL, function(err, client) {
	if(err) {
		console.error('error fetching client from pool', err);
	}

	var query = client.query('SELECT * FROM sysex', function(err, result) {
		console.log(err);
		console.log(result);
	});


	console.log('connected to database');
});