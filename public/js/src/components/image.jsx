var React = require('react');

module.exports = React.createClass({
	render: function(){
		return <img className={this.props.className} src={this.props.url} />
	}
});