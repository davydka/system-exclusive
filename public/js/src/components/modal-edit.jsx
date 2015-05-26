var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.modalData.title,
			description: this.props.modalData.description,
			confirmDelete: false
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			title: nextProps.modalData.title,
			description: nextProps.modalData.description,
			confirmDelete: false
		});
	},

	handleTitleChange: function(event) {
		this.setState({
			title: event.target.value
		});
	},

	handleDescriptionChange: function(event) {
		this.setState({
			description: event.target.value
		});
	},

	handleSaveClick2: function(event){
		event.preventDefault();
		this.props.handleSaveClick2($('#modalEdit form').serializeArray());
	},

	handleSureDeleteClick: function(event){
		event.preventDefault();
		this.setState({
			confirmDelete: true
		});
		//this.props.handleDeleteClick($('#modalEdit form').serializeArray());
	},

	handleDeleteClick: function(event){
		event.preventDefault();
		this.props.handleDeleteClick($('#modalEdit form').serializeArray());
	},

	render:function(){
		var deleteButton = <button ref="deleteButton" onClick={this.handleSureDeleteClick} className="btn btn-danger btn-xs delete">
			Delete Sysex File
		</button>;

		if(this.state.confirmDelete){
			deleteButton = <button ref="deleteButton" onClick={this.handleDeleteClick} className="btn btn-warning btn-xs delete">
				Are you Sure?
			</button>
		}

		return <div id="modalEdit" className="modal fade" role="dialog">
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
							<input type="hidden" id="save-id" name="save-id" value={this.props.modalData.id} />
							<div className="input-group">
								<span className="input-group-addon" id="save-title">Title: </span>
								<input type="text" className="form-control" name="save-title" value={this.state.title} aria-describedby="save-title" onChange={this.handleTitleChange} />
							</div>
							<br/>
							<div className="input-group">
								<span className="input-group-addon" id="save-description">Description: </span>
								<input type="text" className="form-control" name="save-description" value={this.state.description} aria-describedby="save-description" onChange={this.handleDescriptionChange} />
							</div>
							<br/>
							<button ref="saveButton" onClick={this.handleSaveClick2} className="btn btn-primary save">
								Save
							</button>
							{deleteButton}
						</form>
					</div>
				</div>
			</div>
		</div>
	}
});