#Notes

* Install server side dependencies: `npm install`
* Install front end libraries/frameworks: `bower install`
* Run the server for local development: `gulp serve` or just `gulp`


http://www.reddit.com/r/perfectLoops.json
http://infinite-gif.herokuapp.com/


React Notes
https://www.udemy.com/learn-and-understand-reactjs
	meh, incomplete
	does introduce browserify architecture, which is interesting

https://www.codementor.io/reactjs/tutorial/react-js-flux-architecture-tutorial

https://github.com/planningcenter/react-patterns


react is cool compared to other javascript frameworks because it can render large amounts of data
	i.e. if you have a list of 100 items, and you edit the 3rd item, it doesn't need to rerender everything
		it does a diff in  it's virtual dom and only renders the changes, neat!

app.jsx kicks off react app
	componentWillMount
	componentWillUnmount
	props - displaying data
		especially data between child view and parent view
	state - user interaction
		be sure to use getInitialState

browserify - server side js compilation solves bower problem

react component
	getInitialState
		store interactive vars here
	componentDidMount
	render
		essentially this is the View

jsx
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



