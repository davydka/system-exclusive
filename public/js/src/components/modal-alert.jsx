var React = require('react');

module.exports = React.createClass({

	render:function(){

		return <div id="modalAlert" className="modal fade" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5>{this.props.title}</h5>
					</div>

					<div className="modal-body">
						{this.props.body}
					</div>
				</div>
			</div>
		</div>
	}
});