var React = require('react');
var Sizeof = require('sizeof');
var S = require('string');

module.exports = React.createClass({

	getInitialState: function(){
		return {
			gettingFile: false,
			sent: false,
			playing: false,
			playText: 'play',
			playEnabled: true
		}
	},

	handleInlinePlayClick: function(index){
		var id = this.props.serverSysex[index].id;

		if(typeof this.props.output == 'undefined'){
			$('.output-holder').addClass('bg-warning');
			this.setState({
				gettingFile: id,
				playText: 'Select a Midi Output',
				sent: false,
				playEnabled: true
			})
			//console.log('select output');
			return;
		}

		// TODO see about getting this down to one ajax request, new API endpoint?
		$.ajax({
			type: 'GET',
			url: '/api/v1/sysex/'+id,
			beforeSend: function(){
				this.setState({
					gettingFile: id,
					playText: 'Fetching file...',
					sent: false,
					playEnabled: "disabled"
				});
			}.bind(this),
			complete: function(){

			}.bind(this),
			success: function(data){
				var byteArray = [];
				var req = new XMLHttpRequest();
				req.open('GET',  data[0].filePath, false);
				req.overrideMimeType('text\/plain; charset=x-user-defined');
				req.send(null);
				if (req.status != 200) return byteArray;
				for (var i = 0; i < req.responseText.length; ++i) {
					byteArray.push(req.responseText.charCodeAt(i) & 0xff)
				}
				//console.log([byteArray]);

				//this.setState({
				//	gettingFile: false
				//});
				//this.props.setPlayingState("play");

				this.props.handlePlayClick([byteArray]);
				this.setState({
					sent: true,
					playEnabled: true
				});
			}.bind(this)
		});
		//$.get('/api/v1/sysex/'+id, function(data){
		//
		//	var byteArray = [];
		//	var req = new XMLHttpRequest();
		//	req.open('GET',  data[0].filePath, false);
		//	req.overrideMimeType('text\/plain; charset=x-user-defined');
		//	req.send(null);
		//	if (req.status != 200) return byteArray;
		//	for (var i = 0; i < req.responseText.length; ++i) {
		//		byteArray.push(req.responseText.charCodeAt(i) & 0xff)
		//	}
		//	//console.log([byteArray]);
		//
		//	this.props.handlePlayClick([byteArray]);
		//
		//}.bind(this));
	},

	handleInlineDownloadClick: function(index){
		var id = this.props.serverSysex[index].id;

		$.get('/api/v1/sysex/'+id, function(data){

			var byteArray = [];
			var req = new XMLHttpRequest();
			req.open('GET',  data[0].filePath, false);
			req.overrideMimeType('text\/plain; charset=x-user-defined');
			req.send(null);
			if (req.status != 200) return byteArray;
			for (var i = 0; i < req.responseText.length; ++i) {
				byteArray.push(req.responseText.charCodeAt(i) & 0xff)
			}
			//console.log([byteArray]);

			this.props.handleInlineDownloadClick(
				[byteArray],
				this.props.serverSysex[index].title
			);

		}.bind(this));

	},

	handleInlineEditClick: function(index){
		this.props.handleInlineEditClick(index);
	},

	getIndividualSysex: function(id, callback){
		$.get('/api/v1/sysex/'+id, function(data){

			var byteArray = [];
			var req = new XMLHttpRequest();
			req.open('GET',  data[0].filePath, false);
			req.overrideMimeType('text\/plain; charset=x-user-defined');
			req.send(null);
			if (req.status != 200) return byteArray;
			for (var i = 0; i < req.responseText.length; ++i) {
				byteArray.push(req.responseText.charCodeAt(i) & 0xff)
			}
			//console.log([byteArray]);

			callback([byteArray]);

		}.bind(this));
	},

	render:function(){
		if(this.props.serverSysex.length){

			var rows = this.props.serverSysex.map(function(item, index){

				var playButton = <button ref="playButton" onClick={this.handleInlinePlayClick.bind(this, index)} className="btn btn-success play btn-xs">
					<span className="glyphicon glyphicon-play" ></span>
					{this.state.sent && item.id == this.state.gettingFile ? 'Message Sent' : 'Play'}
				</button>;

				if(item.id == this.state.gettingFile && !this.state.sent){
					playButton = <button ref="playButton" onClick={this.handleInlinePlayClick.bind(this, index)} className={this.state.playEnabled+" btn btn-warning play btn-xs"}>
						<span className="glyphicon glyphicon-play" ></span>
						{this.props.inlinePlayText ? this.props.inlinePlayText : this.state.playText}
					</button>;
				}

				return <tr>
					<td>{item.id}</td>
					<td>{item.title}</td>
					<td>{item.description}</td>
					<td>
						<div className="table-controls">
							{playButton}

							<button ref="downloadButton" onClick={this.handleInlineDownloadClick.bind(this, index)} className="btn btn-primary download btn-xs">
								<span className="glyphicon glyphicon-download-alt" ></span>
								Download
							</button>
							<button ref="shareButton" onClick={this.handleInlineShareClick} className="btn btn-default share btn-xs">
								<span className="glyphicon glyphicon-globe" ></span>
								<a href={"/syx/"+item.id}>Share</a>
							</button>

							<button ref="editButton" onClick={this.handleInlineEditClick.bind(this, index)} className="btn btn-default edit btn-xs">
								<span className="glyphicon glyphicon-pencil" ></span>
								Edit
							</button>
						</div>
					</td>
				</tr>
			}.bind(this));

			return <div>
				<table className="data-table table table-hover table-striped">
					<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>

						</th>
					</tr>
					</thead>
					<tbody>

					{rows}

					</tbody>
				</table>
				<br/>
			</div>
		} else {
			return null;
		}
	}
});