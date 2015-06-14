var React = require('react');

module.exports = React.createClass({
	onChangeHandler: function(){
		this.props.onChangeHandler(this);
	},

	render:function(){
		return <select onChange={this.onChangeHandler} className={this.props.className +" form-control"} name={this.props.className}>
				{typeof this.props.initialText != 'undefined' ? <option value="false">{this.props.initialText}</option> : ""}
				{this.props.items.map(function(result) {
					//console.log(this.props.initialInput);
					return <option value={result.id} selected={this.props.initialInput == result.id}>{result.text}</option>
				}.bind(this))}
			</select>;
	}
});