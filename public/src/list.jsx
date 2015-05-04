var React = require('react');

module.exports = React.createClass({
	render: function(){
		var list = this.props.items.map(function(item){
			return <li>{item}</li>
		});

		return <ul>
			{list}
		</ul>
	}
});