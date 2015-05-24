var React = require('react');

module.exports = React.createClass({

	render: function(){
		return <div className={this.props.controlClass+" control control-dial lfo-rate"}>
			<h4 className="control-title">{this.props.controlTitle}</h4>
			<div className="control-body">
				<canvas id={this.props.controlId} data-nx="dial"></canvas>
			</div>
		</div>
	}
});