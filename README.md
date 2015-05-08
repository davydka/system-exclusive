#React Notebook
What you're looking at is an ongoing test project for building a site using React, Node, Express, Postgres, and [Browserify](). Right now I'm using [http://www.reddit.com/r/perfectLoops.json]() as a datasource. Postgres will store comments and votes based on the images, essentially duplicating the functionality of where they come from, but hey, this app serves no purpose except to learn.

* Install server side dependencies: `npm install`
* Install front end libraries/frameworks: `bower install`
* Run the server for local development: `gulp serve` or just `gulp`

Site Url: [http://infinite-gif.herokuapp.com/]()

##Notes
React supposedly is cool compared to other javascript frameworks because it can render large amounts of data,
	i.e. if you have a list of 100 items, and you edit/need to update the data the 3rd item, it doesn't need to rerender everything.
		React does a diff in it's virtual dom and only renders the changes.


######jsx
	stands for javascript extensions
	html inside javascript
		not valid js
	compiles to valid javascript
		jsx transformer
		script type=text/jsx
			dom class should be called className
			template can be made dynamic with this.props
			you can nest templates
			close all html, even if valid html
			don't wrap attribute values in quotes
	browserify modules - allows you to npm install html templates
	browserify is awesome, let's you write node js style front end code 

#####app.jsx kicks off react app
	componentWillMount
	componentWillUnmount
	props - displaying data
		especially data between child view and parent view
	state - user interaction
		be sure to use getInitialState


#####React Component
	getInitialState
		store interactive vars here
	componentDidMount
	render
		essentially this is the View


		
#####Reactify
	https://www.npmjs.com/package/reactify
	Compiles your jsx files.

####Cool Links
[https://github.com/enaqx/awesome-react]()
	<dd>
		I'll just go here and click on something intersting
		</dd>

[https://www.udemy.com/learn-and-understand-reactjs]()
	<dd>
		Pretty good for basics, seems incomplete, ends abruptly.<br>
		Does introduce browserify architecture, which is pretty awesome.
	</dd>

[https://facebook.github.io/react/tips/initial-ajax.html]()
	<dd>
		This is a simple way to get data into your app.
	</dd>

[https://github.com/planningcenter/react-patterns]()


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
