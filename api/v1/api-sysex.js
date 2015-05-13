var pg = require('pg').native;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app){

// Create
	app.post('/api/v1/sysex', jsonParser, function (req, res){
		var results = [];
		var data = req.body.data;
		var description = req.body.description;
		var title = req.body.title;
		var user_id = req.body.user_id;

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('INSERT INTO sysex (id, ts, data, description, title, user_id) VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4) RETURNING id', [data, description, title, user_id]);

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

// Read
	app.get('/api/v1/sysex/:sysex_id', function (req, res) {
		var results = [];
		var id = req.params.sysex_id;

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('SELECT * FROM sysex where id = $1', [id]);

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
	app.put('/api/v1/sysex/:sysex_id', jsonParser, function (req, res) {
		var results = [];
		var id = req.params.sysex_id;
		var data = req.body.data;
		var description = req.body.description;
		var title = req.body.title;
		var user_id = req.body.user_id;

		pg.connect(process.env.DATABASE_URL, function(err, client) {

			//client.query('INSERT INTO data (sysex_id, key, value) VALUES ($1, $2, $3)', [id, "comment", req.body.comment]);
			client.query('UPDATE sysex '+
				'SET data = $1, '+
				'description = $2, '+
				'title = $3 '+
				'WHERE id = $4',
			[data, description, title, id]);


			var query = client.query('SELECT * FROM sysex where id = $1 order by ts desc', [id]);


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
	app.delete('/api/v1/sysex/:sysex_id', function (req, res) {
		var results = [];
		var id = req.params.sysex_id;

		// Get a Postgres client from the connection pool
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {

			// SQL Query > Delete Data
			client.query("DELETE FROM sysex WHERE id=($1)", [id]);

			// SQL Query > Select Data
			var query = client.query('SELECT * FROM sysex where id = $1', [id]);

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
}