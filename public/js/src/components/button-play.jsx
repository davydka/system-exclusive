var React = require('react');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			playing: false,
			sent: false
		}
	},

	resetSentState: function(){
		this.setState({
			sent: false
		});
	},

	handlePlayClick: function(){
		React.findDOMNode(this.refs.playButton).blur();
		this.props.handlePlayClick();
		this.setState({
			sent: true
		});

		TweenLite.killDelayedCallsTo(this.resetSentState);
		TweenLite.delayedCall(1, this.resetSentState);

	},

	render:function(){
		if(this.props.sysex.length && !this.state.sent){
			return <button ref="playButton" onClick={this.handlePlayClick} className="btn btn-success play">
				<span className="glyphicon glyphicon-play" ></span>
				Play
			</button>
		} else if(this.props.sysex.length && this.state.sent){
			return <button ref="playButton" onClick={this.handlePlayClick} className="btn btn-warning play">
				<span className="glyphicon glyphicon-play" ></span>
				Message Sent
			</button>
		} else {
			return null;
		}
	}
});