var React = require('react');
var Cookie = require('react-cookie');
var S = require('string');

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
			serverSysex: [],
			sysex: []
		}
	},

	logOutCookie: function(){
		Cookie.remove('u');
		this.setState({
			userId:undefined
		});
	},

	componentDidMount: function(){
		if(typeof this.state.userId == 'undefined'){
			$.get('/me', function(data){
				if(typeof data =='object'){
					this.setState({
						userId:data.id
					});
					Cookie.save('u', data.id);
					this.getUserSysex();
				} else {
					this.logOutCookie();
				}
			}.bind(this));
		} else {
			this.getUserSysex();
		}

		if(this.isMounted()) {
			// sysex: true brings up a security dialog, see: http://www.w3.org/TR/webmidi/#security-and-privacy-considerations-of-midi
			navigator.requestMIDIAccess({ sysex: true }).then(this.onSuccessCallback, this.onErrorCallback);
		}
	},

	getUserSysex: function(){
		$.get('/api/v1/sysex/user/'+this.state.userId, function(data){
			if(typeof data !='object'){
				this.logOutCookie();
				return;
			}
			// Data is coming back as a Postgres array, so we clean it up here.
			data.map(function(item, index){
				var cleanData = item.data;
				cleanData = S(cleanData).replaceAll('{', '[').s;
				cleanData = S(cleanData).replaceAll('}', ']').s;

				return item.data = JSON.parse(cleanData);
			});

			this.setState({
				serverSysex: data
			});
		}.bind(this));
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

	handlePlayClick: function(data){
		for(var i = 0; i < data.length; i++){
			this.state.output.send(data[i]);
		}
	},

	closeModalAndGetSysex: function(){
		$('#modalSave').modal('hide');
		this.getUserSysex();
	},

	handleSaveClick: function(input){
		var title='', description='';
		input.map(function(item, index){
			if(item.name == 'save-title'){
				title = item.value;
			}
			if(item.name == 'save-description'){
				description = item.value;
			}
		});
		$.ajax({
			type: 'POST',
			url: '/api/v1/sysex',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify({
				description: description,
				title: title,
				user_id: this.state.user_id,
				data: this.state.sysex
			}),
			success: this.closeModalAndGetSysex
		});
	},

	handleDownloadClick: function(){
		console.log(this.state.sysex);
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
			sysex: [[240, 0, 32, 50, 127, 21, 52, 84, 122, 63, 100, 46, 15, 81, 12, 9, 65, 81, 40, 15, 40, 118, 48, 38, 104, 82, 99, 52, 124, 34, 70, 86, 54, 35, 54, 78, 32, 54, 119, 13, 107, 37, 43, 38, 24, 35, 57, 46, 113, 94, 91, 47, 96, 66, 77, 57, 81, 97, 74, 127, 77, 45, 94, 93, 50, 120, 117, 88, 107, 59, 63, 90, 18, 127, 6, 30, 28, 126, 121, 68, 68, 23, 21, 7, 88, 29, 21, 10, 123, 49, 93, 45, 58, 29, 127, 16, 71, 69, 92, 46, 247]],
			//sysex: [],
			output: midiAccess.outputs.get(this.props.initialOutput)
		});

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
			console.log(event.data);
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
			serverSysex = {this.state.serverSysex}
			recording={this.state.recording}
			handleRecordClick={this.handleRecordClick}
			handlePlayClick={this.handlePlayClick}
			handleSaveClick={this.handleSaveClick}
			handleDownloadClick={this.handleDownloadClick}
			userId={this.state.userId}
			/>;
	}
});