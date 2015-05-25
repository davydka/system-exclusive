var React	= require('react');
var Sizeof	= require('sizeof');

var Select			= require('../components/select');
var Dial			= require('../components/dial');
var Panel 			= require('../components/panel');
var ButtonRecord	= require('../components/button-record');
var ButtonPlay		= require('../components/button-play');
var ButtonSave		= require('../components/button-save');
var ButtonDownload	= require('../components/button-download');

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
		$('#modalLogin').modal({show:true});
		return false;
	},

	handlePlayClick: function(){
		this.props.handlePlayClick(this.props.sysex);
	},

	handleInlinePlayClick: function(index){
		console.log(this.props.serverSysex[index]);
		this.props.handlePlayClick(this.props.serverSysex[index].data);
	},


	handleRecordClick: function(){
		this.props.handleRecordClick();
	},

	handleSaveClick1: function(childComponent){
		$('#modalSave').modal({
			show: true
		});
	},

	handleSaveClick2: function(event){
		event.preventDefault();
		this.props.handleSaveClick($('#modalSave form').serializeArray());
	},

	handleDownloadClick: function(childComponent){
		this.props.handleDownloadClick();
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

		if(this.props.serverSysex.length){
			var rows = this.props.serverSysex.map(function(item, index){
				return <tr>
					<td>{item.id}</td>
					<td>{item.title}</td>
					<td>{item.description}</td>
					<td>
						<button ref="playButton" onClick={this.handleInlinePlayClick.bind(this, index)} className="btn btn-success play btn-xs">
							<span className="glyphicon glyphicon-play" ></span>
							Play
						</button>

						<button ref="downloadButton" onClick={this.handleInlineDownloadClick} className="btn btn-primary download btn-xs">
							<span className="glyphicon glyphicon-download-alt" ></span>
							Download
						</button>

						<button ref="deleteButton" onClick={this.handleInlineShareClick} className="btn btn-default share btn-xs">
							<span className="glyphicon glyphicon-globe" ></span>
							Share
						</button>

						<button ref="deleteButton" onClick={this.handleInlineEditClick} className="btn btn-default edit btn-xs">
							<span className="glyphicon glyphicon-pencil" ></span>
							Edit
						</button>
					</td>
				</tr>
			}.bind(this));

			var dataTable = <table className="data-table table table-hover table-striped">
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
				<br/>
				<ButtonRecord handleRecordClick={this.handleRecordClick} recording={this.props.recording} />
				<ButtonPlay handlePlayClick={this.handlePlayClick} sysex={this.props.sysex} />
				<ButtonSave handleSaveClick1={this.handleSaveClick1} sysex={this.props.sysex} />
				<ButtonDownload handleDownloadClick={this.handleDownloadClick} sysex={this.props.sysex}  />
				<br/><br/>
				<div className="well well-sm">Sysex Messages Received: {this.props.sysex.length}</div>
				<div className="well well-sm">Holding {Sizeof.sizeof(this.props.sysex, true)} of memory in browser.</div>
			</div>

			{dataTable}

			<br/>
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

			<div id="modalSave" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4>Save Setting</h4>
							<button type="button" className="close btn btn-default" data-dismiss="modal">
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						</div>

						<div className="modal-body">
							<form action="">
								<div className="input-group">
									<span className="input-group-addon" id="save-title">Title: </span>
									<input type="text" className="form-control" name="save-title" placeholder="An inspired setting." aria-describedby="save-title" />
								</div>
								<br/>
								<div className="input-group">
									<span className="input-group-addon" id="save-description">Description: </span>
									<input type="text" className="form-control" name="save-description" placeholder="I remember composing this on long summer's evening." aria-describedby="save-description" />
								</div>
								<br/>
								<button ref="saveButton" onClick={this.handleSaveClick2} className="btn btn-primary save">
									Save
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
});