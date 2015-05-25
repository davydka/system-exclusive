var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var pg = require('pg').native;
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');

var environment = process.env.NODE_ENV;



/*
/register
/login
/logout
*/
app.use(stormpath.init(app, {
	apiKeyId:		process.env.STORMPATH_API_KEY_ID,
	apiKeySecret:	process.env.STORMPATH_API_KEY_SECRET,
	secretKey:		process.env.STORMPATH_SECRET_KEY,
	application:	process.env.STORMPATH_URL,
	sessionDuration: 1000 * 60 * 525949, // year
	postRegistrationHandler: function(account, req, res, next) {
		pg.connect(process.env.DATABASE_URL, function(err, client) {
			var query = client.query('INSERT INTO account (id, ts, name, pass, email, description, avatar) VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4, $5) RETURNING id', [account.givenName +' ' +account.surname , '', account.email, '', '']);

			// Handle Errors
			if(err) {
				console.log(err);
			}
		});
		console.log('User:', account.email, 'just registered!');
		next();
	},
	postLoginHandler: function(account, req, res, next) {
		req.user.id = 1;
		console.log('User:', account.email, 'just logged in!');
		next();
	}
}));


app.get('/me', stormpath.loginRequired, function(req, res) {
	var user = req.user;

	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var results = [];
		var query = client.query('SELECT * FROM account where email = $1', [user.email]);

		// Stream results back one row at a time
		query.on('row', function (row) {
			results.push(row);
		});

		// After all data is returned, close connection and return results
		query.on('end', function () {
			client.end();

			console.log(results[0]);
			return res.json({
				givenName: user.givenName,
				surname: user.surname,
				email: user.email,
				id: results[0].id
			});

		});

		// Handle Errors
		if (err) {
			console.log(err);
		}
	});


});

app.use(express.static('public'));

require('./api/v1/api-sysex.js')(app);
require('./api/v1/api-user.js')(app);

server.listen(process.env.PORT || 3000);

server.on('listening', function() {
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);

	if(environment == 'development'){
		//var spawn = require('child_process').spawn
		//spawn('open', ['http://localhost:'+server.address().port]);
	}
});


















