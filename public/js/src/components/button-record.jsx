var React = require('react');

module.exports = React.createClass({
	handleRecordClick: function(){
		React.findDOMNode(this.refs.recordButton).blur();
		this.props.handleRecordClick();
	},

	render:function(){
		if(!this.props.recording){
			return <button ref="recordButton" onClick={this.handleRecordClick} className="record btn btn-danger">
				<span className="glyphicon glyphicon-plus"></span>
				Record System Exclusive Messages
			</button>;
		} else {
			return <button ref="recordButton" onClick={this.handleRecordClick} className="recording record btn btn-danger">
				<span className="glyphicon glyphicon-stop"></span>
				Listening...
			</button>;
		}
	}
});