var React = require('react');
var Sizeof = require('sizeof');

var Select	 = require('../components/select');
var Dial	 = require('../components/dial');
var Panel 	 = require('../components/panel');

module.exports = React.createClass({

	componentDidMount: function(){

		//nx.onload = this.props.nexusOnload();
		nx.onload = function(){
			nx.colorize("#ffffff"); // sets accent (default)
			nx.colorize("border", "#222222");
			nx.colorize("fill", "#222222");

			//lfoRate.context.fillStyle = "#333";
			//lfoRate.context.fillText("Hello world", 10, 50);
		};

		// Setup Nexus UI Controls
		nx.init();
	},

	inputChangeHandler: function(childComponent){
		var selected = $(childComponent.getDOMNode()).find('option:selected');
		this.props.setInput(selected.val());
	},

	outputChangeHandler: function(childComponent){
		var selected = $(childComponent.getDOMNode()).find('option:selected');
		this.props.setOutput(selected.val());
	},

	handleLoginClick: function(childComponent){
		//$('#myModal').on('show', function () {
		//	$('iframe').attr("src",$('iframe').attr("src"));
		//});
		$('#modalLogin').modal({show:true});
		return false;
	},

	handlePlayClick: function(childComponent){
		//console.log(childComponent);
		React.findDOMNode(this.refs.playButton).blur();
		this.props.handlePlayClick();
	},

	handleRecordClick: function(childComponent){
		//console.log(childComponent);
		React.findDOMNode(this.refs.recordButton).blur();
		this.props.handleRecordClick();
	},

	handleSaveClick: function(childComponent){
		React.findDOMNode(this.refs.saveButton).blur();
		this.props.handleSaveClick();
	},

	handleDownloadClick: function(childComponent){
		React.findDOMNode(this.refs.downloadButton).blur();
		this.props.handleSaveClick();
	},

	render: function(){
		//console.log(this.props.midi.inputs);

		var midiInputs = [];
		this.props.midi.inputs.forEach( function( key, port ) {
			midiInputs.push({"text":key.name, "id":key.id});

		});

		var midiOutputs = [];
		this.props.midi.outputs.forEach( function( key, port ) {
			midiOutputs.push({"text":key.name, "id":key.id});

		});

		var sysexItems = this.props.sysex.map(function(item, index){
			//console.log(item);
			return <div>New Sysex Message {index+1}</div>
		});

		if(!this.props.recording){
			var recordButton = <button ref="recordButton" onClick={this.handleRecordClick} className="record btn btn-danger">
				<span className="glyphicon glyphicon-plus"></span>
				Record System Exclusive Messages
			</button>;
		} else {
			var recordButton = <button ref="recordButton" onClick={this.handleRecordClick} className="recording record btn btn-danger">
				<span className="glyphicon glyphicon-stop"></span>
				Listening...
			</button>;
		}

		if(this.props.sysex.length){
			var playButton = <button ref="playButton" onClick={this.handlePlayClick} className="btn btn-success play">
				<span className="glyphicon glyphicon-play" ></span>
				Play
			</button>
		} else {
			var playButton = null;
		}

		if(this.props.sysex.length){
			var saveButton = <button ref="saveButton" onClick={this.handleSaveClick} className="btn btn-primary save">
				<span className="glyphicon glyphicon-cloud-upload" ></span>
				Save Sysex
			</button>
		} else {
			var saveButton = null;
		}

		if(this.props.sysex.length){
			var downloadButton = <button ref="downloadButton" onClick={this.handleDownloadClick} className="btn btn-primary download">
				<span className="glyphicon glyphicon-download-alt" ></span>
				Download Sysex
			</button>
		} else {
			var downloadButton = null;
		}

		if(this.props.serverSysex.length){
			var rows = this.props.serverSysex.map(function(item, index){
				return <tr>
					<td>{item.id}</td>
					<td>{item.title}</td>
					<td>{item.description}</td>
					<td>
						<button ref="playButton" onClick={this.handlePlayClick} className="btn btn-success play btn-xs">
							<span className="glyphicon glyphicon-play" ></span>
							Play
						</button>

						<button ref="downloadButton" onClick={this.handleDownloadClick} className="btn btn-primary download btn-xs">
							<span className="glyphicon glyphicon-download-alt" ></span>
							Download
						</button>

						<button ref="deleteButton" onClick={this.handleShareClick} className="btn btn-default share btn-xs">
							<span className="glyphicon glyphicon-globe" ></span>
							Share
						</button>

						<button ref="deleteButton" onClick={this.handleEditClick} className="btn btn-default edit btn-xs">
							<span className="glyphicon glyphicon-pencil" ></span>
							Edit
						</button>
					</td>
				</tr>
			});

			var dataTable = <table className="table table-hover table-striped">
				<thead>
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>Description</th>
					<th>

					</th>
				</tr>
				</thead>
				<tbody>

				{rows}

				</tbody>
			</table>
		} else {
			var datTable = null;
		}

		if(typeof this.props.userId == 'undefined'){
			var accountButton = <div className="btn-group account-group" role="group" >
				<button ref="loginButton" className="btn btn-default login ">
					<a href="/login">Login</a>
				</button>
				<button ref="signupButton" className="btn btn-default signup ">
					<a href="/register">Signup</a>
				</button>
			</div>;
		} else {
			var accountButton =  <div className="btn-group account-group" role="group" >
				<button ref="logoutButton" className="btn btn-default logout ">
					<a href="/logout">Logout</a>
				</button>
			</div>;
		}




		return <div>
			<h1>System Exclusive</h1>

			{accountButton}

			<h3>Input</h3>
			<Select onChangeHandler={this.inputChangeHandler} initialText="Select a Midi Input" items={midiInputs} className="midiInputSelect" initialInput={this.props.initialInput} initialOutput={this.props.initialOutput} />

			<h3>Output</h3>
			<Select onChangeHandler={this.outputChangeHandler} initialText="Select a Midi Output" items={midiOutputs} className="midiOutputSelect" initialInput={this.props.initialOutput} initialOutput={this.props.initialOutput} />

			<div className={this.props.className+" midi-activity-container"}>
				<h3>Midi Activity</h3>
				<div className={this.props.className+" panel panel-default"}>
					<div className="panel-body midi-activity">
						{this.props.midiActivity}
					</div>
				</div>
			</div>

			<div className="play-controls">
				<h3 spacing></h3>
				{recordButton}
				{playButton}
				{saveButton}
				{downloadButton}
				<h3 spacing></h3>
				<div className="well well-sm">Sysex Messages Received: {this.props.sysex.length}</div>
				<div className="well well-sm">Holding {Sizeof.sizeof(this.props.sysex, true)} of memory in browser.</div>

				{dataTable}
			</div>

			<h3 spacing></h3>
			<div className="panel-container">

				<Panel
					panelTitle="LFO"
					panelClassName="panel-moog panel-lfo"
					>
					<Dial
						controlTitle="RATE"
						controlId="lfoRate"
						controlClass=""
						/>

					<Dial
						controlTitle="WAVE"
						controlId="lfoWave"
						controlClass=""
						/>

					<hr/>

					<Dial
						controlTitle="FINE TUNE"
						controlId="fineTune"
						controlClass="dial-small"
						/>

					<Dial
						controlTitle="GLIDE RATE"
						controlId="glideRate"
						controlClass="dial-small"
						/>
				</Panel>

				<Panel
					panelTitle="MODULATION BUSSES"
					panelClassName="panel-moog panel-modulation-busses">

					<div className="row">
						<div className="col-sm-6">
							<Dial
								controlTitle="SOURCE"
								controlId="mod1Source"
								controlClass=""
								/>

							<Dial
								controlTitle="DESTINATION"
								controlId="mod1Destination"
								controlClass=""
								/>

							<Dial
								controlTitle="CONTROLLER"
								controlId="mod1Controller"
								controlClass=""
								/>

							<Dial
								controlTitle="AMOUNT"
								controlId="mod1Amount"
								controlClass="dial-small"
								/>
						</div>
						<div className="col-sm-6">
							<Dial
								controlTitle="SOURCE"
								controlId="mod2Source"
								controlClass=""
								/>

							<Dial
								controlTitle="DESTINATION"
								controlId="mod2Destination"
								controlClass=""
								/>

							<Dial
								controlTitle="CONTROLLER"
								controlId="mod2Controller"
								controlClass=""
								/>

							<Dial
								controlTitle="AMOUNT"
								controlId="mod2Amount"
								controlClass="dial-small"
								/>
						</div>
					</div>
				</Panel>
			</div>

			<div className="hide panel panel-default">
				<img src="images/panel.jpg" alt=""/>
			</div>


			<div id="modalLogin" className="modal fade" role="dialog">

				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close btn btn-default" data-dismiss="modal">
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						</div>

						<div className="modal-body">
							<iframe src="/login" width="100%" height="500" frameborder="0"></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
});