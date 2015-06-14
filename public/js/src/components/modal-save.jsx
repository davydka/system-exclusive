var React = require('react');

var Select = require('../components/select');

module.exports = React.createClass({

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
								<span className="input-group-addon" id="save-program" data-toggle="tooltip" data-placement="top" title="Send a midi Program Change message after loading the sysex message. This is helpful on some synths to preview your new sound.">
									<span className="glyphicon glyphicon-question-sign"></span> &nbsp;
									Send Program Change after load:
								</span>
								<Select onChangeHandler={this.handleProgramChange} initialText="No" items={this.oneTo128} className="save-program" />
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
	},

	oneTo128 : [
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
		{'id':16, 'text':16},
		{'id':17, 'text':17},
		{'id':18, 'text':18},
		{'id':19, 'text':19},
		{'id':20, 'text':20},
		{'id':21, 'text':21},
		{'id':22, 'text':22},
		{'id':23, 'text':23},
		{'id':24, 'text':24},
		{'id':25, 'text':25},
		{'id':26, 'text':26},
		{'id':27, 'text':27},
		{'id':28, 'text':28},
		{'id':29, 'text':29},
		{'id':30, 'text':30},
		{'id':31, 'text':31},
		{'id':32, 'text':32},
		{'id':33, 'text':33},
		{'id':34, 'text':34},
		{'id':35, 'text':35},
		{'id':36, 'text':36},
		{'id':37, 'text':37},
		{'id':38, 'text':38},
		{'id':39, 'text':39},
		{'id':40, 'text':40},
		{'id':41, 'text':41},
		{'id':42, 'text':42},
		{'id':43, 'text':43},
		{'id':44, 'text':44},
		{'id':45, 'text':45},
		{'id':46, 'text':46},
		{'id':47, 'text':47},
		{'id':48, 'text':48},
		{'id':49, 'text':49},
		{'id':50, 'text':50},
		{'id':51, 'text':51},
		{'id':52, 'text':52},
		{'id':53, 'text':53},
		{'id':54, 'text':54},
		{'id':55, 'text':55},
		{'id':56, 'text':56},
		{'id':57, 'text':57},
		{'id':58, 'text':58},
		{'id':59, 'text':59},
		{'id':60, 'text':60},
		{'id':61, 'text':61},
		{'id':62, 'text':62},
		{'id':63, 'text':63},
		{'id':64, 'text':64},
		{'id':65, 'text':65},
		{'id':66, 'text':66},
		{'id':67, 'text':67},
		{'id':68, 'text':68},
		{'id':69, 'text':69},
		{'id':70, 'text':70},
		{'id':71, 'text':71},
		{'id':72, 'text':72},
		{'id':73, 'text':73},
		{'id':74, 'text':74},
		{'id':75, 'text':75},
		{'id':76, 'text':76},
		{'id':77, 'text':77},
		{'id':78, 'text':78},
		{'id':79, 'text':79},
		{'id':80, 'text':80},
		{'id':81, 'text':81},
		{'id':82, 'text':82},
		{'id':83, 'text':83},
		{'id':84, 'text':84},
		{'id':85, 'text':85},
		{'id':86, 'text':86},
		{'id':87, 'text':87},
		{'id':88, 'text':88},
		{'id':89, 'text':89},
		{'id':90, 'text':90},
		{'id':91, 'text':91},
		{'id':92, 'text':92},
		{'id':93, 'text':93},
		{'id':94, 'text':94},
		{'id':95, 'text':95},
		{'id':96, 'text':96},
		{'id':97, 'text':97},
		{'id':98, 'text':98},
		{'id':99, 'text':99},
		{'id':100, 'text':100},
		{'id':101, 'text':101},
		{'id':102, 'text':102},
		{'id':103, 'text':103},
		{'id':104, 'text':104},
		{'id':105, 'text':105},
		{'id':106, 'text':106},
		{'id':107, 'text':107},
		{'id':108, 'text':108},
		{'id':109, 'text':109},
		{'id':110, 'text':110},
		{'id':111, 'text':111},
		{'id':112, 'text':112},
		{'id':113, 'text':113},
		{'id':114, 'text':114},
		{'id':115, 'text':115},
		{'id':116, 'text':116},
		{'id':117, 'text':117},
		{'id':118, 'text':118},
		{'id':119, 'text':119},
		{'id':120, 'text':120},
		{'id':121, 'text':121},
		{'id':122, 'text':122},
		{'id':123, 'text':123},
		{'id':124, 'text':124},
		{'id':125, 'text':125},
		{'id':126, 'text':126},
		{'id':127, 'text':127},
		{'id':128, 'text':128}
	],

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
});