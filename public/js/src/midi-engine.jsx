var React = require('react');
var Cookie = require('react-cookie');
var S = require('string');

var Home = require('./templates/home');
var Error = require('./components/error');


// Lifecycle
// 		componentDidMount
//			requestMidiAccess
//				onSuccessCallback
//					addEvents
//					set Midi Access State Object

module.exports = React.createClass({
	midi: null,
	clockCount: 1,
	timeline: '',
	lastTime: 0,
	defaultRecordText: 'Record New System Exclusive Messages',


	getInitialState: function(){
		return {
			index:0,
			output: undefined,
			input: undefined,
			midi: false,
			midiActivity: '',
			panelClassName: 'hide',
			userId: Cookie.load('u'),
			recording: false,
			recordText: this.defaultRecordText,
			saving: false,
			serverSysex: [],
			detailData: undefined,
			isDetail: false,
			inlinePlayText: false,
			sendProgram: 0,
			channel: 1,
			oldSysex: [],
			sysex: []
		}
	},

	logOutCookie: function(){
		Cookie.remove('u');
		this.setState({
			userId:undefined
		});
	},

	updateSendProgram: function(channel, program){
		this.setState({
			sendProgram: program,
			channel: channel
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

		// Are we on a syx detail page?
		if(location.pathname.toLowerCase().indexOf('syx') > -1){
			this.setState({
				isDetail: true
			});
			var id = location.pathname.toLowerCase().substr(location.pathname.toLowerCase().lastIndexOf('/') + 1);
			this.getIndividualSysex(id);
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

			this.setState({
				serverSysex: data
			});


		}.bind(this));
	},

	getIndividualSysex: function(id){
		$.get('/api/v1/sysex/'+id, function(data){
			// Data is coming back as a Postgres array, so we clean it up here.
			var byteArray = [];
			var req = new XMLHttpRequest();
			req.open('GET',  data[0].filePath, false);
			req.overrideMimeType('text\/plain; charset=x-user-defined');
			req.send(null);
			if (req.status != 200) return byteArray;
			for (var i = 0; i < req.responseText.length; ++i) {
				byteArray.push(req.responseText.charCodeAt(i) & 0xff)
			}

			this.setState({
				detailData: data[0],
				recording:false,
				recordText: this.defaultRecordText,
				sysex: [byteArray]
			});
		}.bind(this));
	},

	nexusOnload: function(){

	},

	handleClock: function(){

	},

	handleRecordClick: function(){
		if(typeof this.state.input == 'undefined'){
			$('.input-holder').addClass('bg-warning');
			this.setState({
				recordText: 'Please select a Midi input'
			});
			//console.log('alert user they need to select an input');
			return false;
		}

		if(this.state.recording && this.state.sysex.length == 0){
			this.setState({
				recording: false,
				recordText: this.defaultRecordText,
				sysex: this.state.oldSysex
			})
		} else if(this.state.recording && this.state.sysex.length > 0){
			this.setState({
				recording: false,
				recordText: this.defaultRecordText,
				isDetail: false
			})
		} else {
			this.setState({
				recording: true,
				recordText: 'Listening...',
				oldSysex: this.state.sysex,
				sysex: []
			})
		}
	},

	handlePlayClick: function(data){
		this.setState({
			inlinePlayText: false
		})
		if(typeof this.state.output != 'undefined'){
			for(var i = 0; i < data.length; i++){
				this.state.output.send(data[i]);

				// End of Sysex Message, do a callback?
				if(i == data.length-1 && this.state.sendProgram > 0 && this.state.sendProgram != 'false'){
					var channel = parseInt(this.state.channel) + 191;
					channel = "0x" + parseInt(channel).toString(16);

					var program = 0;
					program = "0x" + (parseInt(this.state.sendProgram)-1).toString(16);

					this.state.output.send([channel, program]);
				}
			}
		} else {
			console.log('alert user to select an output');
		}
	},

	closeModalAndGetSysex: function(){
		$('.modal').modal('hide');
		if(this.state.isDetail){
			this.getIndividualSysex(this.state.detailData.id);
		} else {
			this.getUserSysex();
		}
	},

	handleSaveClick: function(input){
		if(typeof this.state.userId == 'undefined'){
			console.log('alert user to login/register, and rerecord their message');
			return;
		}

		var title='', description='', id='', program='', channel='';

		input.map(function(item, index){
			if(item.name == 'save-id'){
				id = item.value;
			}
			if(item.name == 'save-title'){
				title = item.value;
			}
			if(item.name == 'save-description'){
				description = item.value;
			}
			if(item.name == 'save-program'){
				program = item.value;
			}
			if(item.name == 'save-channel'){
				channel = item.value;
			}
		});


		var normalArray = [];
		// TODO: see about just sending binary here
		// We do this to convert Uint8Array into an normal array
		// because this changes the way the data stores the data
		this.state.sysex.map(function(item, index){
			var mainItem = [];

			for (i = 0; i < item.length; i++) {
				mainItem.push(item[i]);
			}

			normalArray.push(mainItem);
		});


		//console.log(this.state.saving);
		//return;

		if(id != ''){
			$.ajax({
				type: 'PUT',
				url: '/api/v1/sysex/'+id,
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({
					description: description,
					title: title,
					program: program,
					channel: channel,
					id: id
				}),
				beforeSend: function(){
					this.setState({
						saving: true
					});
				}.bind(this),
				complete: function(){
					this.setState({
						saving: false
					});
				}.bind(this),
				success: this.closeModalAndGetSysex
			});
		} else {
			$.ajax({
				type: 'POST',
				url: '/api/v1/sysex',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({
					description: description,
					title: title,
					program: program,
					channel: channel,
					user_id: this.state.user_id,
					data: normalArray
				}),
				beforeSend: function(){
					this.setState({
						saving: true
					});
				}.bind(this),
				complete: function(){
					this.setState({
						saving: false
					});
				}.bind(this),
				success: this.closeModalAndGetSysex
			});
		}
	},

	handleDeleteClick: function(input){
		var id='';
		input.map(function(item, index){
			if(item.name == 'save-id'){
				id = item.value;
			}
		});


		if(id != ''){
			$.ajax({
				type: 'DELETE',
				url: '/api/v1/sysex/'+id,
				contentType: 'application/json',
				dataType: 'json',
				success: this.closeModalAndGetSysex
			});
		}
	},

	byteDump: [],

	Dec2Bin: function(n){
		if(!this.checkDec(n)||n<0)
			return 0;
		return n.toString(2)
	},

	checkDec: function(n){
		return/^[0-9]{1,64}$/.test(n);
	},

	pad: function(s,z){
		s = "" + s;
		return s.length < z ? this.pad("0"+s, z) : s;
	},

	handleDownloadClick: function(data, title){
		if(typeof data == 'undefined'){
			data = this.state.sysex;
			title = 'sysex';
		}
		if(title == ''){
			title = 'sysex';
		}
		//console.log(data); //this is coming through as strings instead of numbers
		//console.log(this.state.sysex);

		var hexString = '';
		data.map(function(item, index){

			if(typeof item != 'object'){
				// nada
			} else {
				var mainItem = [];
				for (i = 0; i < item.length; i++) {
					mainItem.push(this.pad(parseInt(item[i]).toString(16), 2));
				}
				hexString = hexString+mainItem.join("");
			}

		}.bind(this));

		if(hexString == ''){
			return;
		}

		//var hexString2 = this.hexDump[0].join("");
		hexString = hexString.toUpperCase();

		var byteArray = new Uint8Array(hexString.length/2);
		for (var x = 0; x < byteArray.length; x++){
			byteArray[x] = parseInt(hexString.substr(x*2,2), 16);
		}

		var blob = new Blob([byteArray], {type: "application/octet-stream"});
		saveAs(blob, title+".syx");
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
			//sysex: [[240, 0, 32, 50, 127, 21, 52, 84, 122, 63, 100, 46, 15, 81, 12, 9, 65, 81, 40, 15, 40, 118, 48, 38, 104, 82, 99, 52, 124, 34, 70, 86, 54, 35, 54, 78, 32, 54, 119, 13, 107, 37, 43, 38, 24, 35, 57, 46, 113, 94, 91, 47, 96, 66, 77, 57, 81, 97, 74, 127, 77, 45, 94, 93, 50, 120, 117, 88, 107, 59, 63, 90, 18, 127, 6, 30, 28, 126, 121, 68, 68, 23, 21, 7, 88, 29, 21, 10, 123, 49, 93, 45, 58, 29, 127, 16, 71, 69, 92, 46, 247]],
			sysex: [],
			output: midiAccess.outputs.get(this.props.initialOutput)
		});


		// Set default midi selection
		if(typeof this.props.initialInput != 'undefined'){
			this.setInput(this.props.initialInput);
		}

	},

	setInput: function(id){
		var input = this.state.midi.inputs.get(id);
		input.onmidimessage = this.midiInputHandler;

		$('.input-holder').removeClass('bg-warning');

		this.setState({
			input: input,
			recording: true,
			recordText: 'Listening...'
		});

		Cookie.save('input', input.id);
	},

	setOutput: function(id){
		$('.output-holder').removeClass('bg-warning');
		//$('.table-controls .btn-warning')

		this.setState({
			output: this.state.midi.outputs.get(id),
			inlinePlayText: "Play"
		})

		Cookie.save('output', id);
	},

	midiInputHandler: function(event){
		//console.log(event.data[0]);

		// Program Change, channel 1-16
		if(event.data[0] >= 192 && event.data[0] <= 207){
			var channel = event.data[0] - 191;
			var program = event.data[1];

			console.log([channel, program]);

			return;
		}

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
				isDetail: false,
				sysex: this.state.sysex.concat([event.data])
			});
			//console.log(event.data);
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



		return <Home
			midi={this.state.midi}
			output={this.state.output}
			input={this.state.input}
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
			recordText={this.state.recordText}
			saving={this.state.saving}
			handleRecordClick={this.handleRecordClick}
			handlePlayClick={this.handlePlayClick}
			handleSaveClick={this.handleSaveClick}
			handleDeleteClick={this.handleDeleteClick}
			handleDownloadClick={this.handleDownloadClick}
			userId={this.state.userId}
			detailData= {this.state.detailData}
			isDetail= {this.state.isDetail}
			inlinePlayText= {this.state.inlinePlayText}
			updateSendProgram= {this.updateSendProgram}
			/>;
	}
});