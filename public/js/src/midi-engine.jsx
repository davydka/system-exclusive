var React = require('react');

var Home = require('./templates/home');
var Error = require('./components/error');


// Lifecycle
// 		componentDidMount
//			requestMidiAccess
//				onSusccessCallback
//					addEvents
//					set Midi Access State Object

module.exports = React.createClass({
	midi: null,
	clockCount: 1,
	timeline: '',
	lastTime: 0,

	getInitialState: function(){
		return {
			index:0,
			midi: false,
			midiActivity: '',
			panelClassName: 'hide'
		}
	},

	componentDidMount: function(){
		if(this.isMounted()) {
			// sysex: true brings up a security dialog, see: http://www.w3.org/TR/webmidi/#security-and-privacy-considerations-of-midi
			navigator.requestMIDIAccess({ sysex: true }).then(this.onSuccessCallback, this.onErrorCallback);
		}
	},

	nexusOnload: function(){

	},

	handleClock: function(){

	},

	addEvents: function(){
		// Listen for the event.
		addEventListener('clockTick', this.handleClock, true);

	},

	onErrorCallback: function(err){
		this.setState({
			midi: false
		});

		console.log('error!');
		console.log(err);
	},

	onSuccessCallback: function( midiAccess ) {
		console.log(midiAccess);

		this.addEvents();

		this.setState({
			midi: midiAccess
		});
	},

	setInput: function(id){
		var input = this.state.midi.inputs.get(id);
		input.onmidimessage = this.midiInputHandler;

		var obj = { Url: location.origin+"?input="+input.id+"&output" };
		history.pushState(obj, "", obj.Url);
	},

	midiInputHandler: function(event){
		//console.log(event);
		// Clock Signals
		if(event.data[0] == 250){
			this.clockCount = 1;
			//console.log("start");
			//this.timeline.play();
			return;
		}
		//if(event.data[0] == 252){
		//	console.log("stop");
		//	this.setState({
		//		playing:false
		//	});
		//	return;
		//}

		// Clock
		if(event.data[0] == 248){
			this.clockCount++;
			if(this.clockCount % 24 == 0){
				this.clockCount = 1;
				console.log( ((event.timeStamp - this.lastTime) * 6.000) / 24.000 );
				this.lastTime = event.timeStamp;
			}

			dispatchEvent(clockTick);
			return;
		}
		//if(event.data[0] != 144){
		//	return;
		//}
	},

	midiOutputHandler: function(event){
		console.log(event);
		if(event.data[0] != 144){
			return;
		}
	},

	render: function(){
		if(!this.state.midi){
			return null;
			//return <Error message="Your browser does not support the web midi api." />
		}

		// Set default midi selection
		if(this.props.initialInput){
			this.setInput(this.props.initialInput);
		}

		return <Home
			midi={this.state.midi}
			midiActivity={this.state.midiActivity}
			className={this.state.panelClassName}
			setInput={this.setInput}
			nexusOnload = {this.nexusOnload}
			initialInput={this.props.initialInput}
			initialOutput={this.props.initialOutput}

			/>;
	}
});