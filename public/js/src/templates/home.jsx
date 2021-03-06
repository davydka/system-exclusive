var React	= require('react');
var Sizeof	= require('sizeof');
var TinyColor = require('tinycolor2');

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

	componentDidUpdate: function(){
		var canvas = $('#visualization');
		var color = TinyColor.random().toRgb();

		if(canvas.length && this.props.serverSysex.length && this.props.sysex.length){
			canvas = canvas[0];
			var context = canvas.getContext('2d');

			pixelHeight = 1;
			if(this.props.sysex[0].length > 150){
				// Set the height of the canvas based on how much data we're visualizing.
				context.canvas.height = this.props.sysex[0].length / canvas.width;
				console.log(this.props.sysex[0].length);
			} else {
				pixelHeight = 150;
			}



			this.props.sysex.map(function(item, index){
				item.map(function(item1, index1){
					var x = index1 % canvas.width;
					var y = (index1 - x) / canvas.width;

					context.fillStyle = 'rgb(' + item1 + ','+ color.g +', '+ color.b +')';

					context.fillRect(x, y, 1, pixelHeight);
				}.bind(this));
			}.bind(this));

		}
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
							<ButtonPlay output={this.props.output} inlinePlayText={this.props.inlinePlayText} handlePlayClick={this.handlePlayClick} sysex={this.props.sysex} detailData={this.props.detailData} />
							<br/>
							{buttonSaveOrEdit}
							<br/>
							<ButtonDownload handleDownloadClick={this.handleDownloadClick} sysex={this.props.sysex} detailData={this.props.detailData} />
							<br/>
						</div>
						<div className="col-md-8 visualizationContainer">
							<h6>Visualization of Sysex File</h6>
							<canvas id="visualization" ref="visualization"></canvas>
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
			<h1><a href="/">System Exclusive</a></h1>

			<AccountGroup userId = {this.props.userId} />

			<div className="input-holder">
				<h3>Input {this.props.userId}</h3>
				<Select onChangeHandler={this.inputChangeHandler} initialText="Select a Midi Input" items={midiInputs} className="midiInputSelect" initialInput={this.props.initialInput} initialOutput={this.props.initialOutput} />
			</div>

			<div className="output-holder">
				<h3>Output</h3>
				<Select onChangeHandler={this.outputChangeHandler} initialText="Select a Midi Output" items={midiOutputs} className="midiOutputSelect" initialInput={this.props.initialOutput} initialOutput={this.props.initialOutput} />
			</div>

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
						<ButtonRecord text={this.props.recordText} handleRecordClick={this.handleRecordClick} recording={this.props.recording} detailData={this.props.detailData} />
						<br/>
					</div>
					<div className={(this.props.isDetail ? "hide" : "")+" col-md-8 "}>
						<ButtonPlay output={this.props.output} inlinePlayText={this.props.inlinePlayText} handlePlayClick={this.handlePlayClick} sysex={this.props.sysex} detailData={this.props.detailData} />
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
				output ={this.props.output}
				inlinePlayText = {this.props.inlinePlayText}
				serverSysex = {this.props.serverSysex}
				handlePlayClick = {this.handleInlinePlayClick}
				handleInlineDownloadClick = {this.handleInlineDownloadClick}
				handleInlineEditClick = {this.handleInlineEditClick}
				updateSendProgram = {this.props.updateSendProgram}
				/>

			<PanelMain></PanelMain>

			<ModalAlert title={this.state.messageTitle} body={this.state.messageBody}></ModalAlert>

			<ModalLogin></ModalLogin>

			<ModalEdit modalData={this.state.modalData} handleSaveClick2={this.handleSaveClick2} handleDeleteClick={this.handleDeleteClick} ></ModalEdit>

			<ModalSave saving={this.props.saving} handleSaveClick2={this.handleSaveClick2} ></ModalSave>

		</div>
	}
});