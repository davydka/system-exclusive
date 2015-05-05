var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			counter: 0
		}
	},

	increment: function(){
		this.setState({counter: this.state.counter+1});
	},

	render: function(){
		return <button onClick={this.increment} type="button" className={"btn " + this.props.className}>
			{this.props.title}
			<span className={"sub-title "+this.props.subTitleClassName}>
				{this.state.counter}
			</span>
		</button>
	}
});