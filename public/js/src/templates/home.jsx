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
var ModalAlert		= require('../components/modal-alert');
var ModalSave		= require('../components/modal-save');
var ModalLogin		= require('../components/modal-login');
var ModalEdit		= require('../components/modal-edit');
var PanelMain		= require('../components/panel-main');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			messageTitle: '',
			messageBody: '',
			modalData: this.props.sysex,
			sizeX: this.getRandomInt(0,9),
			sizeY: this.getRandomInt(0,9)
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
		if(typeof this.props.userId != 'undefined'){
			$('#modalSave').modal({
				show: true
			});
		} else {
			var returnTo = '';
			if(this.props.isDetail){
				returnTo = '?returnTo='+location.pathname;
			}

			this.setState({
				messageTitle: 'Please login or register to save Sysex file to your account.',
				messageBody: <div className="btn-group account-group-modal" role="group" >
					<button className="btn btn-default login ">
						<a href={"/login"+returnTo}>Login</a>
					</button>
					<button className="btn btn-default signup ">
						<a href={"/register"+returnTo}>Signup</a>
					</button>
				</div>
			})

			$('#modalAlert').modal({
				show: true
			});
		}
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
	},

	handleEditClick: function(){
		this.setState({
			modalData: this.props.detailData
		});

		$('#modalEdit').modal({
			show: true
		});
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	render: function(){

		var midiInputs = [];
		this.props.midi.inputs.forEach( function( key, port ) {
			midiInputs.push({"text":key.name, "id":key.id});

		});

		var midiOutputs = [];
		this.props.midi.outputs.forEach( function( key, port ) {
			midiOutputs.push({"text":key.name, "id":key.id});
		});

		var details = null;

		if(typeof this.props.detailData != 'undefined' && !this.props.recording && this.props.isDetail){
			var kittenString = "https://placekitten.com/41"+this.state.sizeX+"/30"+this.state.sizeY;

			var buttonSaveOrEdit = <button ref="editButton" onClick={this.handleEditClick} className="btn btn-default edit">
				<span className="glyphicon glyphicon-pencil" ></span>
				Edit
			</button>;

			if(typeof this.props.userId == 'undefined'){
				buttonSaveOrEdit = <ButtonSave handleSaveClick1={this.handleSaveClick1} sysex={this.props.sysex} detailData={this.props.detailData} />;
			}

			details = <div className="jumbotron details">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<h3>{this.props.detailData.title}</h3>
							<p>{this.props.detailData.description}</p>
							<br/>
							<ButtonPlay handlePlayClick={this.handlePlayClick} sysex={this.props.sysex} detailData={this.props.detailData} />
							<br/>
							{buttonSaveOrEdit}
							<br/>
							<ButtonDownload handleDownloadClick={this.handleDownloadClick} sysex={this.props.sysex} detailData={this.props.detailData} />
							<br/>
						</div>
						<div className="col-md-8">
							<img src={kittenString} alt=""/>
						</div>
					</div>
				</div>
			</div>
		} else if(typeof this.props.detailData == 'undefined' && !this.props.recording && this.props.isDetail){
			details = <div className="jumbotron details details-loading">
				<img src="/images/banana.gif" alt="Details"/>
				<h4>Loading details...</h4>
				<img src="/images/banana.gif" alt="Details"/>
			</div>
		}


		return <div>
			<h1>System Exclusive</h1>

			<AccountGroup userId = {this.props.userId} />

			<h3>Input {this.props.userId}</h3>
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
				{details}
				<div className="row">
					<div className="col-md-4">
						<ButtonRecord handleRecordClick={this.handleRecordClick} recording={this.props.recording} detailData={this.props.detailData} />
						<br/>
					</div>
					<div className="col-md-8">
						<ButtonPlay handlePlayClick={this.handlePlayClick} sysex={this.props.sysex} detailData={this.props.detailData} />
						<ButtonSave handleSaveClick1={this.handleSaveClick1} sysex={this.props.sysex} detailData={this.props.detailData} />
						<ButtonDownload handleDownloadClick={this.handleDownloadClick} sysex={this.props.sysex} detailData={this.props.detailData} />
					</div>
				</div>
				<br/>
				<div className="well well-sm">Sysex Messages Received: {this.props.sysex.length}</div>
				<div className="well well-sm">Holding {Sizeof.sizeof(this.props.sysex, true)} of memory in browser.</div>
			</div>

			<br/>
			{this.props.serverSysex.length ? <h3>Message Library</h3> : ""}
			<TableData
				output={this.props.output}
				serverSysex = {this.props.serverSysex}
				handlePlayClick={this.handleInlinePlayClick}
				handleInlineDownloadClick={this.handleInlineDownloadClick}
				handleInlineEditClick={this.handleInlineEditClick}
				/>

			<h3>Controls</h3>
			<PanelMain></PanelMain>

			<ModalAlert title={this.state.messageTitle} body={this.state.messageBody}></ModalAlert>

			<ModalLogin></ModalLogin>

			<ModalEdit modalData={this.state.modalData} handleSaveClick2={this.handleSaveClick2} handleDeleteClick={this.handleDeleteClick} ></ModalEdit>

			<ModalSave saving={this.props.saving} handleSaveClick2={this.handleSaveClick2} ></ModalSave>

		</div>
	}
});