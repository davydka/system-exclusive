var pg = require('pg').native;

var environment = process.env.NODE_ENV;


pg.connect(process.env.DATABASE_URL, function(err, client) {

	client.query("drop TABLE account", function(err, result) {
		console.log(err);
		console.log(result);
	});

	//var create_sysex_table_query = client.query(
	//	"CREATE TABLE sysex( " +
	//		"id				serial primary key, " +
	//		"ts				timestamp without time zone default (now() at time zone 'utc'), " +
	//		"data			text not null, " +
	//		"description	text, " +
	//		"title			text, " +
	//		"user_id		text " +
	//	")",
	//	function(err, result) {
	//	console.log(err);
	//	console.log(result);
	//});

	var create_account_table_query = client.query(
		"CREATE TABLE account( " +
			"id				serial primary key, " +
			"ts				timestamp without time zone default (now() at time zone 'utc'), " +
			"name			text unique, " +
			"pass			text, " +
			"description	text, " +
			"avatar			text " +
		")",
		function(err, result) {
		console.log(err);
		console.log(result);
	});

});