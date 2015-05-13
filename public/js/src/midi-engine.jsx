var React = require('react');

var Home = require('./templates/home');
var Error = require('./components/error');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			index:0,
			hasMidi: false
		}
	},

	componentDidMount: function(){
		if(this.isMounted()) {
			navigator.requestMIDIAccess().then(this.onsuccesscallback, this.onerrorcallback);
		}
	},

	onerrorcallback: function(err){
		this.setState({
			hasMidi: false
		});

		console.log('error!');
		console.log(err);
	},

	onsuccesscallback: function( access ) {
		this.setState({
			hasMidi: true
		});

		var m = null; // m = MIDIAccess object for you to make calls on

		m = access;

		// Things you can do with the MIDIAccess object:
		var inputs = m.inputs; // inputs = MIDIInputMaps, you can retrieve the inputs with iterators
		var outputs = m.outputs; // outputs = MIDIOutputMaps, you can retrieve the outputs with iterators

		var iteratorInputs = inputs.values(); // returns an iterator that loops over all inputs
		var input = iteratorInputs.next().value; // get the first input

		input.onmidimessage = this.midiHandler; // onmidimessage( event ), event.data & event.receivedTime are populated

		var iteratorOutputs = outputs.values(); // returns an iterator that loops over all outputs
		var output = iteratorOutputs.next().value; // grab first output device

		// Hook up spacebar
		document.onkeypress = function(e) {
			e = e || window.event;
			var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
			// space bar
			if (charCode == 32) {
				this.midiHandler();
				return false; //prevent space bar from doing default scrolling
			}
		}.bind(this);
	},

	midiHandler: function(event){
		if(typeof event != 'undefined'){
			if(event.data[0] != 144){
				return;
			}
		}
		console.log(this.state.index);
		this.state.index++;
		TweenMax.to(window, 0, {scrollTo:{y:$('.list-item').eq(this.state.index).offset().top}, ease:Power2.easeOut});
	},

	render: function(){
		if(!this.state.hasMidi){
			return <Error message="Your browser does not support the web midi api." />
		}

		return <Home />;
	}
});