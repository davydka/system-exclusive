var React = require('react');

module.exports = React.createClass({
	render:function(){
		return  <button type="button" class="btn btn-default">{this.props.text}</button>
	}
});