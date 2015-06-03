var React = require('react');
var Sizeof = require('sizeof');
var S = require('string');

module.exports = React.createClass({
	handleInlinePlayClick: function(index){
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

			this.props.handlePlayClick([byteArray]);

		}.bind(this));
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

				return <tr>
					<td>{item.id}</td>
					<td>{item.title}</td>
					<td>{item.description}</td>
					<td>
						<div className="table-controls">
							<button ref="playButton" onClick={this.handleInlinePlayClick.bind(this, index)} className="btn btn-success play btn-xs">
								<span className="glyphicon glyphicon-play" ></span>
								Play
							</button>

							<button ref="downloadButton" onClick={this.handleInlineDownloadClick.bind(this, index)} className="btn btn-primary download btn-xs">
								<span className="glyphicon glyphicon-download-alt" ></span>
								Download
							</button>
							<button ref="deleteButton" onClick={this.handleInlineShareClick} className="btn btn-default share btn-xs">
								<span className="glyphicon glyphicon-globe" ></span>
								<a href={"/syx/"+item.id}>Share</a>
							</button>

							<button ref="deleteButton" onClick={this.handleInlineEditClick.bind(this, index)} className="btn btn-default edit btn-xs">
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