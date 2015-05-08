var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var pg = require('pg').native;
var bodyParser = require('body-parser')

var environment = process.env.NODE_ENV


app.use(express.static('public'));

var jsonParser = bodyParser.json();

server.listen(process.env.PORT || 3000);


server.on('listening', function() {
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);

	if(environment == 'development'){
		//var spawn = require('child_process').spawn
		//spawn('open', ['http://localhost:'+server.address().port]);
	}
});

// Create
app.post('/api/v1/thing', jsonParser, function (req, res){
	var results = [];
	var id = req.body.thing_id;

	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var existsQuery = client.query('SELECT * FROM thing where id = $1', [id], function(err, result) {
			console.log(err);

			if(result.rowCount < 1){
				var query = client.query('INSERT INTO thing (id) VALUES ($1) RETURNING id', [id]);

				// Stream results back one row at a time
				query.on('row', function(row) {
					results.push(row);
				});

				// After all data is returned, close connection and return results
				query.on('end', function() {
					client.end();
					return res.json(results);

				});

				// Handle Errors
				if(err) {
					console.log(err);
				}
			} else {
				return res.json({"id":id});
			}
		});
	});
});

// Read
app.get('/api/v1/thing/:thing_id', function (req, res) {
	var results = [];
	var id = req.params.thing_id;

	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('SELECT * FROM data where thing_id = $1 order by ts desc', [id]);

		// Stream results back one row at a time
		query.on('row', function (row) {
			results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			client.end();
			return res.json(results);

		});

		// Handle Errors
		if (err) {
			console.log(err);
		}
	});
});

// Update
app.put('/api/v1/thing/:thing_id', jsonParser, function (req, res) {
	var results = [];
	var id = req.params.thing_id;

	pg.connect(process.env.DATABASE_URL, function(err, client) {

		if(req.body.comment){
			client.query('INSERT INTO data (thing_id, key, value) VALUES ($1, $2, $3)', [id, "comment", req.body.comment]);
		} else if(req.body.vote){
			client.query('INSERT INTO data (thing_id, key, value) VALUES ($1, $2, $3)', [id, "vote", req.body.vote]);
		}

		var query = client.query('SELECT * FROM data where thing_id = $1 order by ts desc', [id]);


		// Stream results back one row at a time
		query.on('row', function(row) {
			results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function() {
			client.end();
			return res.json(results);

		});

		// Handle Errors
		if(err) {
			console.log(err);
		}
	});
});

// Delete
app.delete('/api/v1/thing/:thing_id', function (req, res) {
	var results = [];
	var id = req.params.thing_id;

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done) {

		// SQL Query > Delete Data
		client.query("DELETE FROM data WHERE thing_id=($1)", [id]);

		// SQL Query > Select Data
		var query = client.query('SELECT * FROM data where thing_id = $1 order by ts desc', [id]);

		// Stream results back one row at a time
		query.on('row', function(row) {
			results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function() {
			client.end();
			return res.json(results);
		});

		// Handle Errors
		if(err) {
			console.log(err);
		}

	});
});

pg.connect(process.env.DATABASE_URL, function(err, client) {
	if(err) {
		console.error('error fetching client from pool', err);
	}

	var query = client.query('SELECT * FROM data', function(err, result) {
		console.log(err);
		console.log(result);
	});


	//var query = client.query("drop TABLE data", function(err, result) {
	//	console.log(err);
	//	console.log(result);
	//});
	//var query = client.query("CREATE TABLE data( thing_id text NOT NULL, key text not null, value text, ts timestamp without time zone default (now() at time zone 'utc'))", function(err, result) {
	//	console.log(err);
	//	console.log(result);
	//});
	//var query = client.query("CREATE TABLE thing( id text PRIMARY KEY NOT NULL UNIQUE )", function(err, result) {
	//	console.log(err);
	//	console.log(result);
	//});

	console.log('connected to database');
});