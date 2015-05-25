var React = require('react');

module.exports = React.createClass({
	handleSaveClick1: function(){
		this.props.handleSaveClick1();
	},

	render:function(){
		if(this.props.sysex.length){
			return <button ref="saveButton" onClick={this.handleSaveClick1} className="btn btn-primary save">
				<span className="glyphicon glyphicon-cloud-upload" ></span>
				Save Sysex
			</button>
		} else {
			return null;
		}
	}
});