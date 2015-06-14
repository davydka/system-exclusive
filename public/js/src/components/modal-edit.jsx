var React = require('react');

var Select = require('../components/select');

module.exports = React.createClass({
	oneToSixteen : [
		{'id':1, 'text':1},
		{'id':2, 'text':2},
		{'id':3, 'text':3},
		{'id':4, 'text':4},
		{'id':5, 'text':5},
		{'id':6, 'text':6},
		{'id':7, 'text':7},
		{'id':8, 'text':8},
		{'id':9, 'text':9},
		{'id':10, 'text':10},
		{'id':11, 'text':11},
		{'id':12, 'text':12},
		{'id':13, 'text':13},
		{'id':14, 'text':14},
		{'id':15, 'text':15},
		{'id':16, 'text':16}
	],

	getInitialState: function() {
		return {
			title: this.props.modalData.title,
			description: this.props.modalData.description,
			program: this.props.modalData.program,
			channel: this.props.modalData.channel,
			confirmDelete: false
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			title: nextProps.modalData.title,
			description: nextProps.modalData.description,
			program: nextProps.modalData.program,
			channel: nextProps.modalData.channel,
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

	handleProgramChange: function(event) {
		if(typeof event.target != 'undefined'){
			this.setState({
				program: event.target.value
			});
		} else {
			this.setState({
				program: $('.save-program option:selected').val()
			});
		}
	},

	handleChannelChange: function(event) {
		if(typeof event.target != 'undefined'){
			this.setState({
				channel: event.target.value
			});
		} else {
			this.setState({
				channel: $('.save-channel option:selected').val()
			});
		}
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
							<div className="input-group">
								<span className="input-group-addon" id="save-program">Send Program Change after load: </span>
								<Select onChangeHandler={this.handleProgramChange} initialText="No" initialInput={this.state.program} items={this.oneToSixteen} className="save-program" />
							</div>
							<br/>
							<div className={"input-group " + (this.state.program == 0 ? "hide" : "")}>
								<span className="input-group-addon" id="save-channel">Channel: </span>
								<Select onChangeHandler={this.handleChannelChange} initialInput={this.state.channel} items={this.oneToSixteen} className="save-channel" />
							</div>
							{this.state.program == 0 ? "" : <br/>}
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