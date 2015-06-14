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

	getInitialState: function(){
		return {
			program: 0
		}
	},

	handleProgramChange: function(event) {
		if(typeof event.target != 'undefined'){
			this.setState({
				program: event.target.value
			});
		} else {
			this.setState({
				program: $('#modalSave .save-program option:selected').val()
			});
		}
	},

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
							<div className="input-group">
								<span className="input-group-addon" id="save-program">Send Program Change after load: </span>
								<Select onChangeHandler={this.handleProgramChange} initialText="No" items={this.oneToSixteen} className="save-program" />
							</div>
							<br/>
							<div className={"input-group " + (this.state.program == 0 ? "hide" : "")}>
								<span className="input-group-addon" id="save-channel">Channel: </span>
								<Select items={this.oneToSixteen} className="save-channel" />
							</div>
							{this.state.program == 0 ? "" : <br/>}
							{saveButton}
						</form>
					</div>
				</div>
			</div>
		</div>
	}
});