var React = require('react');
var Cookie = require('react-cookie');

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
			output: undefined,
			midi: false,
			midiActivity: '',
			panelClassName: 'hide',
			userId: Cookie.load('u'),
			recording: false,
			sysex: []
		}
	},

	componentDidMount: function(){
		if(typeof this.state.userId == 'undefined'){
			$.get('/me', function(data){
				if(typeof data =='object'){
					this.setState({
						userId:data.id
					});
					Cookie.save('u', data.id);
				}

			}.bind(this));
		}
		if(this.isMounted()) {
			// sysex: true brings up a security dialog, see: http://www.w3.org/TR/webmidi/#security-and-privacy-considerations-of-midi
			navigator.requestMIDIAccess({ sysex: true }).then(this.onSuccessCallback, this.onErrorCallback);
		}
	},

	nexusOnload: function(){

	},

	handleClock: function(){

	},

	handleRecordClick: function(){
		if(this.state.recording){
			this.setState({
				recording: false
			})
		} else {
			this.setState({
				recording: true,
				sysex: []
			})
		}
	},

	handlePlayClick: function(){
		for(var i = 0; i < this.state.sysex.length; i++){
			this.state.output.send(this.state.sysex[i]);
		}
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


		this.setState({
			midi: midiAccess,
			recording: true,
			sysex: [],
			output: midiAccess.outputs.get(this.props.initialOutput)
		});

		//if(typeof this.props.initialOutput != 'undefined'){
		//	this.setState({
		//		output: this.state.midi.outputs.get(this.props.initialOutput)
		//	});
		//}

	},

	setInput: function(id){
		var input = this.state.midi.inputs.get(id);
		input.onmidimessage = this.midiInputHandler;

		//var obj = { Url: location.origin+"?input="+input.id+"&output" };
		//history.pushState(obj, "", obj.Url);
		Cookie.save('input', input.id);
	},

	setOutput: function(id){
		this.setState({
			output: this.state.midi.outputs.get(id)
		})

		Cookie.save('output', id);
	},

	midiInputHandler: function(event){
		//console.log(event.data[0]);
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

		// Sysex Message
		if(event.data[0] == 240 && this.state.recording){
			this.setState({
				sysex: this.state.sysex.concat([event.data])
			});
			//console.log(event.data[0]);
			//console.log(event.data[event.data.length-1]);
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
			setOutput={this.setOutput}
			nexusOnload = {this.nexusOnload}
			initialInput={this.props.initialInput}
			initialOutput={this.props.initialOutput}
			sysex = {this.state.sysex}
			handleRecordClick={this.handleRecordClick}
			recording={this.state.recording}
			handlePlayClick={this.handlePlayClick}
			/>;
	}
});