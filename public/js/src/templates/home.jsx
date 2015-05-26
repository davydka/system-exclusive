var React	= require('react');
var Sizeof	= require('sizeof');

var Select			= require('../components/select');
var Dial			= require('../components/dial');
var Panel 			= require('../components/panel');
var ButtonRecord	= require('../components/button-record');
var ButtonPlay		= require('../components/button-play');
var ButtonSave		= require('../components/button-save');
var ButtonDownload	= require('../components/button-download');
var AccountGroup	= require('../components/account-group');
var TableData		= require('../components/table-data');
var ModalSave		= require('../components/modal-save');
var ModalLogin		= require('../components/modal-login');
var ModalEdit		= require('../components/modal-edit');
var PanelMain		= require('../components/panel-main');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			modalData: this.props.sysex
		}
	},

	componentDidMount: function(){
		nx.onload = function(){
			nx.colorize("#ffffff"); // sets accent (default)
			nx.colorize("border", "#222222");
			nx.colorize("fill", "#222222");
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

	handleInlinePlayClick: function(data){
		this.props.handlePlayClick(data);
	},


	handleRecordClick: function(){
		this.props.handleRecordClick();
	},

	handleSaveClick1: function(childComponent){
		$('#modalSave').modal({
			show: true
		});
	},

	handleSaveClick2: function(data){
		this.props.handleSaveClick(data);
	},

	handleDeleteClick: function(data){
		this.props.handleDeleteClick(data);
	},

	handleDownloadClick: function(data){
		this.props.handleDownloadClick(data);
	},

	handleInlineDownloadClick: function(data, title){
		this.props.handleDownloadClick(data, title);
	},

	handleInlineEditClick: function(index){
		this.setState({
			modalData: this.props.serverSysex[index]
		});

		$('#modalEdit').modal({
			show: true
		});

		//console.log(this.props.serverSysex[index].title)
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




		return <div>
			<h1>System Exclusive</h1>

			<AccountGroup userId = {this.props.userId} />

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

			<TableData
				output={this.props.output}
				serverSysex = {this.props.serverSysex}
				handlePlayClick={this.handleInlinePlayClick}
				handleInlineDownloadClick={this.handleInlineDownloadClick}
				handleInlineEditClick={this.handleInlineEditClick}
				/>

			<br/>

			<PanelMain></PanelMain>

			<ModalLogin></ModalLogin>

			<ModalEdit modalData={this.state.modalData} handleSaveClick2={this.handleSaveClick2} handleDeleteClick={this.handleDeleteClick} ></ModalEdit>

			<ModalSave handleSaveClick2={this.handleSaveClick2} ></ModalSave>

		</div>
	}
});