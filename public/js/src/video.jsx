var React = require('react');

module.exports = React.createClass({
	render: function(){
		return <video className={this.props.className} autoPlay loop="true">
			<source src={this.props.url}/>
		</video>
	}
});