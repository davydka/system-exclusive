var React = require('react');

module.exports = React.createClass({

	render: function() {
		return <div className={this.props.panelClassName+" panel"}>
			<div className="panel-heading">
				<h3 className="panel-title">{this.props.panelTitle}</h3>
			</div>
			<div className="panel-body">
				{this.props.children}
			</div>
		</div>
	}
});