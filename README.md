#System Exclusive

* Install server side dependencies: `npm install`
* Install front end libraries/frameworks: `bower install`
* Run the server for local development: `gulp serve` or just `gulp`

Site Url: [http://infinite-gif.herokuapp.com/]()

##Notes



######Sysex
	System Exclusive


###Database Structure
This is a completely wrong implementation of reddit 2 tables style database, but it's fine for this demo.
[http://www.reddit.com/r/programming/comments/z9sm8/reddits_database_has_only_two_tables/]()

* thing
	* id
* data
	* thing_id 
	* key 
	* value
	* timestamp
	
| Function | Http   | URL              | Action |
| -------- | ------ | ---------------- | ------ |
| CREATE   | Post   | /api/v1/thing    | Create a single thing. |
| READ     | Get    | /api/v1/thing/id | Get data for a thing. |
| UPDATE   | Put    | /api/v1/thing/id | Update a single thing. |
| DELETE   | Delete | /api/v1/thing/id | Delete a single thing. |

	curl -X POST -d '{"thing_id":"qWyQJ2W"}' http://localhost:3000/api/v1/thing -H "Content-Type: application/json"
	curl -X GET http://localhost:3000/api/v1/thing/qWyQJ2W
	curl -X PUT -d '{"comment":"whaaaat"}' http://localhost:3000/api/v1/thing/qWyQJ2W  -H "Content-Type: application/json"
	curl -X PUT -d '{"vote":1}' http://localhost:3000/api/v1/thing/qWyQJ2W  -H "Content-Type: application/json"
	curl -X DELETE http://localhost:3000/api/v1/thing/qWyQJ2W
