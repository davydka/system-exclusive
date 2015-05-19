var React = require('react');
var S = require('string');

var Home = require('./templates/home');
var Error = require('./components/error');

module.exports = React.createClass({
	midi: null,

	getInitialState: function(){
		return {
			index:0,
			midi: false,
			midiActivity: 'ok',
			panelClassName: 'hide'
		}
	},

	componentDidMount: function(){
		if(this.isMounted()) {
			// sysex: true brings up a security dialog, see: http://www.w3.org/TR/webmidi/#security-and-privacy-considerations-of-midi
			navigator.requestMIDIAccess({ sysex: true }).then(this.onSuccessCallback, this.onErrorCallback);
		}
	},

	buildInputList: function(){

	},

	onErrorCallback: function(err){
		this.setState({
			midi: false
		});

		console.log('error!');
		console.log(err);
	},

	onSuccessCallback: function( midiAccess ) {
		this.setState({
			midi: midiAccess
		});
	},

	setInput: function(id){
		var input = this.state.midi.inputs.get(id);
		input.onmidimessage = this.midiInputHandler;
		console.log(this.state.midi);
	},

	midiInputHandler: function(event){
		// Clock Signals
		if(event.data[0] == 248){
			//console.log("clock");
			return;
		}
		var hexString = '';
		var hexData = $.map(event.data, function(value, index) {
			if(index > 10000){
				return;
			}
			hexString += value.toString(16) + " ";
			return [value.toString(16)];
		}.bind(this));

		this.setState({
			midiActivity: hexString,
			panelClassName: ""
		});

		//console.log(event.data);

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
			return <Error message="Your browser does not support the web midi api." />
		}

		return <Home midi={this.state.midi} midiActivity={this.state.midiActivity} className={this.state.panelClassName} setInput={this.setInput} />;
	}
});