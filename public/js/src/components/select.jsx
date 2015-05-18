var React = require('react');

module.exports = React.createClass({
	onChangeHandler: function(){
		this.props.onChangeHandler(this);
	},

	render:function(){
		return <select onChange={this.onChangeHandler} className="form-control">
				<option value="false">{this.props.initialText}</option>
				{this.props.items.map(function(result) {
					return <option value={result.id}>{result.text}</option>
				}.bind(this))}
			</select>;
	}
});