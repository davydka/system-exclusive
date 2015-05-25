var React = require('react');

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
		console.log(childComponent);
		console.log("output");
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

		return <div>
			<h1>System Exclusive</h1>

			<h3>Input</h3>
			<Select onChangeHandler={this.inputChangeHandler} initialText="Select a Midi Input" items={midiInputs} className="midiInputSelect" initialInput={this.props.initialInput} initialOutput={this.props.initialOutput} />

			<h3>Output</h3>
			<Select onChangeHandler={this.outputChangeHandler} initialText="Select a Midi Output" items={midiInputs} className="midiOutputSelect" initialInput={this.props.initialOutput} initialOutput={this.props.initialOutput} />

			<div className={this.props.className+" midi-activity-container"}>
				<h3>Midi Activity</h3>
				<div className={this.props.className+" panel panel-default"}>
					<div className="panel-body midi-activity">
						{this.props.midiActivity}
					</div>
				</div>
			</div>

			<div>Sysex Messages in buffer: {this.props.sysex.length}</div>
			{sysexItems}

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
		</div>
	}
});