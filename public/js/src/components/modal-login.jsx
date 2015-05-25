var React = require('react');

module.exports = React.createClass({
	render:function(){
		return <div id="modalLogin" className="modal fade" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close btn btn-default" data-dismiss="modal">
							<span className="glyphicon glyphicon-remove"></span>
						</button>
					</div>

					<div className="modal-body">
						<iframe src="/login" width="100%" height="500" frameborder="0"></iframe>
					</div>
				</div>
			</div>
		</div>
	}
});