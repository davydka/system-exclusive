var React = require('react');

module.exports = React.createClass({
	handleSaveClick2: function(event){
		event.preventDefault();
		this.props.handleSaveClick2($('#modalSave form').serializeArray());
	},

	render:function(){
		var saveButton = <button ref="saveButton" onClick={this.handleSaveClick2} className="btn btn-primary save">
			Save
		</button>;

		if(this.props.saving){
			saveButton = <button ref="saveButton" onClick={this.handleSaveClick2} className="btn btn-warning save disabled">
				Saving... <span><img src="/images/banana.gif" alt="Saving"/></span>
			</button>;
		}

		return <div id="modalSave" className="modal fade" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h4>Save Setting</h4>
						<button type="button" className="close btn btn-default" data-dismiss="modal">
							<span className="glyphicon glyphicon-remove"></span>
						</button>
					</div>

					<div className="modal-body">
						<form action="">
							<div className="input-group">
								<span className="input-group-addon" id="save-title">Title: </span>
								<input type="text" className="form-control" name="save-title" placeholder="An inspired setting." aria-describedby="save-title" />
							</div>
							<br/>
							<div className="input-group">
								<span className="input-group-addon" id="save-description">Description: </span>
								<input type="text" className="form-control" name="save-description" placeholder="I remember composing this on long summer's evening." aria-describedby="save-description" />
							</div>
							<br/>
							{saveButton}
						</form>
					</div>
				</div>
			</div>
		</div>
	}
});