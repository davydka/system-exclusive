var React = require('react');

module.exports = React.createClass({
	handleDownloadClick: function(){
		React.findDOMNode(this.refs.downloadButton).blur();
		this.props.handleDownloadClick();
	},

	render:function(){
		if(this.props.sysex.length){
			return <button ref="downloadButton" onClick={this.handleDownloadClick} className="btn btn-primary download">
				<span className="glyphicon glyphicon-download-alt" ></span>
				Download Sysex
			</button>
		} else {
			return null;
		}
	}
});