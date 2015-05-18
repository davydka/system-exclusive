var React = require('react');

var Select	 = require('../components/select');

module.exports = React.createClass({

	inputChangeHandler: function(childComponent){
		var selected = $(childComponent.getDOMNode()).find('option:selected');
		console.log(selected.val());
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
			<Select onChangeHandler={this.inputChangeHandler} initialText="Select a Midi Input" items={midiInputs} />

			<h3>Output</h3>
			<Select onChangeHandler={this.outputChangeHandler} initialText="Select a Midi Output" items={midiInputs} />
		</div>
	}
});