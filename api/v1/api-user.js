var pg = require('pg').native;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app){

// Create
	app.post('/api/v1/user', jsonParser, function (req, res){
		var results = [];
		var name = req.body.name;
		var pass = req.body.pass;
		var description = req.body.description;
		var avatar = req.body.avatar;

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('INSERT INTO account (id, ts, name, pass, description, avatar) VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4) RETURNING id', [name, pass, description, avatar]);

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
	app.get('/api/v1/user/:account_id', function (req, res) {
		var results = [];
		var id = req.params.account_id;

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('SELECT * FROM account where id = $1', [id]);

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
	app.put('/api/v1/user/:account_id', jsonParser, function (req, res) {
		var results = [];
		var id = req.params.account_id;
		var name = req.body.name;
		var pass = req.body.pass;
		var description = req.body.description;
		var avatar = req.body.avatar;

		pg.connect(process.env.DATABASE_URL, function(err, client) {

			client.query('UPDATE account '+
				'SET name = $1, '+
				'pass = $2, '+
				'description = $3, '+
				'avatar = $4 '+
				'WHERE id = $5',
			[name, pass, description, avatar, id]);


			var query = client.query('SELECT * FROM account where id = $1', [id]);


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
	app.delete('/api/v1/user/:account_id', function (req, res) {
		var results = [];
		var id = req.params.account_id;

		// Get a Postgres client from the connection pool
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {

			// SQL Query > Delete Data
			client.query("DELETE FROM account WHERE id=($1)", [id]);

			// SQL Query > Select Data
			var query = client.query('SELECT * FROM account where id = $1', [id]);

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