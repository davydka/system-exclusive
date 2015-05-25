var React = require('react');

module.exports = React.createClass({
	handlePlayClick: function(){
		React.findDOMNode(this.refs.playButton).blur();
		this.props.handlePlayClick();
	},

	render:function(){
		if(this.props.sysex.length){
			return <button ref="playButton" onClick={this.handlePlayClick} className="btn btn-success play">
				<span className="glyphicon glyphicon-play" ></span>
				Play
			</button>
		} else {
			return null;
		}
	}
});