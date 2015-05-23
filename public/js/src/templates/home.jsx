var React = require('react');

var Select	 = require('../components/select');

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


			<h3 spacing></h3>
			<div className="panel-container">

				<div className="panel panel-moog panel-lfo">
					<div className="panel-heading">
						<h3 className="panel-title">LFO</h3>
					</div>
					<div className="panel-body">
						<div className="control control-knob lfo-rate">
							<h4 className="control-title">RATE</h4>
							<div className="control-body">
								<canvas id="lfoRate" data-nx="dial"></canvas>
							</div>
						</div>

						<div className="control control-knob lfo-wave">
							<h4 className="control-title">WAVE</h4>
							<div className="control-body">
								<canvas id="lfoWave" data-nx="dial"></canvas>
							</div>
						</div>

						<hr/>

						<div className="control control-knob knob-small fine-tune">
							<h4 className="control-title">FINE TUNE</h4>
							<div className="control-body">
								<canvas id="fineTune" data-nx="dial"></canvas>
							</div>
						</div>

						<div className="control control-knob knob-small glide-rate">
							<h4 className="control-title">GLIDE RATE</h4>
							<div className="control-body">
								<canvas id="glideRate" data-nx="dial"></canvas>
							</div>
						</div>
					</div>
				</div>

				<div className="panel panel-moog panel-lfo">
					<div className="panel-heading">
						<h3 className="panel-title">MODULATION BUSSES</h3>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-sm-6">
								<div className="control control-knob mod1-source">
									<h4 className="control-title">SOURCE</h4>
									<div className="control-body">
										<canvas id="mod1Source" data-nx="dial"></canvas>
									</div>
								</div>

								<div className="control control-knob mod1-destination">
									<h4 className="control-title">DESTINATION</h4>
									<div className="control-body">
										<canvas id="mod1Destination" data-nx="dial"></canvas>
									</div>
								</div>

								<div className="control control-knob mod1-controller">
									<h4 className="control-title">CONTROLLER</h4>
									<div className="control-body">
										<canvas id="mod1Controller" data-nx="dial"></canvas>
									</div>
								</div>

								<div className="control control-knob knob-small mod1-amount">
									<h4 className="control-title">AMOUNT</h4>
									<div className="control-body">
										<canvas id="mod1Amount" data-nx="dial"></canvas>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="control control-knob mod2-source">
									<h4 className="control-title">SOURCE</h4>
									<div className="control-body">
										<canvas id="mod2Source" data-nx="dial"></canvas>
									</div>
								</div>

								<div className="control control-knob mod2-destination">
									<h4 className="control-title">DESTINATION</h4>
									<div className="control-body">
										<canvas id="mod2Destination" data-nx="dial"></canvas>
									</div>
								</div>

								<div className="control control-knob mod2-controller">
									<h4 className="control-title">CONTROLLER</h4>
									<div className="control-body">
										<canvas id="mod2Controller" data-nx="dial"></canvas>
									</div>
								</div>

								<div className="control control-knob knob-small mod2-amount">
									<h4 className="control-title">AMOUNT</h4>
									<div className="control-body">
										<canvas id="mod2Amount" data-nx="dial"></canvas>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

			</div>

			<div className="panel panel-default">
				<img src="images/panel.jpg" alt=""/>
			</div>
		</div>
	}
});