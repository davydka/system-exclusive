var React = require('react');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			playing: false,
			sent: false,
			playText: 'Play'
		}
	},

	resetSentState: function(){
		this.setState({
			sent: false
		});
	},

	handlePlayClick: function(){
		React.findDOMNode(this.refs.playButton).blur();

		if(typeof this.props.output == 'undefined'){
			$('.output-holder').addClass('bg-warning');
			this.setState({
				sent: true,
				playText: 'Select a Midi output'
			});
			return;
		}

		this.props.handlePlayClick();
		this.setState({
			sent: true,
			playText: 'Message Sent'
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
			return <button ref="playButton" onClick={this.handlePlayClick} className={this.props.inlinePlayText ? "btn btn-success play" : "btn btn-warning play"}>
				<span className="glyphicon glyphicon-play" ></span>
				{this.props.inlinePlayText ? this.props.inlinePlayText : this.state.playText}
			</button>
		} else {
			return null;
		}
	}
});