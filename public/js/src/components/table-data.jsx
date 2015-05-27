var React = require('react');
var Sizeof = require('sizeof');
var S = require('string');

module.exports = React.createClass({
	handleInlinePlayClick: function(index){
		var id = this.props.serverSysex[index].id;
		this.getIndividualSysex(id);
	},

	handleInlineDownloadClick: function(index){
		this.props.handleInlineDownloadClick(
			this.props.serverSysex[index].data,
			this.props.serverSysex[index].title
		);
	},

	handleInlineEditClick: function(index){
		this.props.handleInlineEditClick(index);
	},

	getIndividualSysex: function(id){
		$.get('/api/v1/sysex/'+id, function(data){
			// Data is coming back as a Postgres array, so we clean it up here.
			data.map(function(item, index){
				var cleanData = item.data;
				cleanData = S(cleanData).replaceAll('{', '[').s;
				cleanData = S(cleanData).replaceAll('}', ']').s;

				return item.data = JSON.parse(cleanData);
			});
			this.props.handlePlayClick(data[0].data);
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

			return <table className="data-table table table-hover table-striped">
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
		} else {
			return null;
		}
	}
});