var pg = require('pg').native;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var stormpath = require('express-stormpath');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function(app){
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Create
	app.post('/api/v1/sysex', jsonParser, function (req, res){
		var results = [];
		var data = req.body.data;
		var description = req.body.description;
		var title = req.body.title;
		var user_id = req.body.user_id;
		var channel = req.body.channel;
		var program = req.body.program;

		if(typeof req.user == 'undefined'){
			res.status(401);
			return res.send('Not Authenticated.');
		}

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var results = [];
			var query = client.query('SELECT * FROM account where email = $1', [req.user.email]);

			// Stream results back one row at a time
			query.on('row', function (row) {
				results.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function () {
				client.end();

				if(results.length){
					user_id = results[0].id;
					//console.log([data, description, title, user_id]);
					pg.connect(process.env.DATABASE_URL, function(err, client) {
						var insertResults = [];
						var query = client.query('INSERT INTO sysex (id, ts, data, description, title, user_id, channel, program) VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id', [data, description, title, user_id, channel, program]);

						// Stream results back one row at a time
						query.on('row', function(row) {
							insertResults.push(row);
						});

						// After all data is returned, close connection and return results
						query.on('end', function() {
							client.end();

							if(insertResults.length){
								var fileName = insertResults[0].id+'.syx';
								var fullPath = 'files/'+user_id+'/';

								var bufferArrays = [];

								data.map(function(item){
									var byteArray = new Uint8Array(item);
									var buffer = new Buffer(byteArray.length);

									for (var i = 0; i < byteArray.length; i++) {
										buffer.writeUInt8(byteArray[i], i);
									}
									bufferArrays.push(buffer);
								});


								var bufferContainer = Buffer.concat(bufferArrays);


								mkdirp(fullPath.slice(0, -1), function (err) {
									if (err) {
										console.error(err)
									} else {
										fs.writeFileSync(fullPath+fileName, bufferContainer);
									}
								});


							}

							return res.json(insertResults);

						});

						// Handle Errors
						if(err) {
							console.log(err);
						}
					});
				}

			});

			// Handle Errors
			if (err) {
				console.log(err);
			}
		});
	});

// Read
	app.get('/api/v1/sysex/:sysex_id', function (req, res) {
		var results = [];
		var id = req.params.sysex_id;

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('SELECT id, ts, description, title, user_id, channel, program FROM sysex where id = $1', [id]);

			// Stream results back one row at a time
			query.on('row', function (row) {
				results.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function () {
				client.end();
				var filePath = '/files/'+results[0].user_id+'/'+results[0].id+'.syx'
				results[0].filePath = filePath;
				return res.json(results);

			});

			// Handle Errors
			if (err) {
				console.log(err);
			}
		});
	});

//Read All
	app.get('/api/v1/sysex/user/:user_id', stormpath.loginRequired, function (req, res) {
		var results = [];
		var id = req.params.user_id;

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('SELECT id, ts, description, title, user_id, channel, program FROM sysex where user_id = $1 ORDER by ts DESC', [id]);

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
		var description = req.body.description;
		var title = req.body.title;
		var id = req.body.id;
		var channel = req.body.channel;
		var program = req.body.program;

		if(typeof req.user == 'undefined'){
			res.status(401);
			return res.send('Not Authenticated.');
		}

		//return res.send('thanks');

		pg.connect(process.env.DATABASE_URL, function(err, client) {

			//client.query('INSERT INTO data (sysex_id, key, value) VALUES ($1, $2, $3)', [id, "comment", req.body.comment]);
			client.query('UPDATE sysex '+
				'SET description = $1, '+
				'title = $2, '+
				'channel = $4, '+
				'program = $5 '+
				'WHERE id = $3',
			[description, title, id, channel, program]);


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

		if(typeof req.user == 'undefined'){
			res.status(401);
			return res.send('Not Authenticated.');
		}

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