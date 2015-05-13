#System Exclusive

* Install server side dependencies: `npm install`
* Install front end libraries/frameworks: `bower install`
* Run the server for local development: `gulp serve` or just `gulp`

Site Url: [http://infinite-gif.herokuapp.com/]()

##Notes



######Sysex
	System Exclusive


###Database Structure
user table
sysex table

* sysex
	* id
	* timestamp
	* data
	* description
	* title
	* user_id
	
* account -> i think user sounds better, but that is a reserved name is postgres, and pluralizing table names is apparently bad practice
	* id
	* timestamp
	* name
	* pass -> store as text, use node-scrypt to create and verify hash
	* description
	* avatar
	
| Function | Http   | URL              | Action |
| -------- | ------ | ---------------- | ------ |
| CREATE   | Post   | /api/v1/sysex    | Create a single sysex. |
| READ     | Get    | /api/v1/sysex/id | Get data for a sysex. |
| UPDATE   | Put    | /api/v1/sysex/id | Update a single sysex. |
| DELETE   | Delete | /api/v1/sysex/id | Delete a single sysex. |
| -------- | ------ | ---------------- | ------ |
| CREATE   | Post   | /api/v1/user    | Create a single user. |
| READ     | Get    | /api/v1/user/id | Get data for a user. |
| UPDATE   | Put    | /api/v1/user/id | Update a single user. |
| DELETE   | Delete | /api/v1/user/id | Delete a single user. |

Sysex API examples
	curl -X POST -d '{"data":"qWyQJ2W", "description":"This is a description.", "title":"This is a title.", "user_id":"1"}' http://localhost:3000/api/v1/sysex -H "Content-Type: application/json"
	curl -X GET http://localhost:3000/api/v1/sysex/3
	curl -X PUT -d '{"data":"abcd", "description":"This is a description.", "title":"This is a title."}' http://localhost:3000/api/v1/sysex/3  -H "Content-Type: application/json"
	curl -X DELETE http://localhost:3000/api/v1/sysex/3
	
User API examples
	curl -X POST -d '{"name":"David2", "pass":"pass123duh", "description":"This is a description.", "avatar":"://avatars3.githubusercontent.com/u/1128500"}' http://localhost:3000/api/v1/user -H "Content-Type: application/json"
	curl -X GET http://localhost:3000/api/v1/user/3
	curl -X PUT -d '{"name":"david", "pass":"pass123duh", "description":"This is a description.", "avatar":"://avatars3.githubusercontent.com/u/1128500"}' http://localhost:3000/api/v1/user/3  -H "Content-Type: application/json"
	curl -X DELETE http://localhost:3000/api/v1/user/3
