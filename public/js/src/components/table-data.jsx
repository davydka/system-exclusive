var React = require('react');

module.exports = React.createClass({
	handleInlinePlayClick: function(index){
		this.props.handlePlayClick(this.props.serverSysex[index].data);
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

	render:function(){
		if(this.props.serverSysex.length){
			var rows = this.props.serverSysex.map(function(item, index){

				return <tr>
					<td>{item.id}</td>
					<td>{item.title}</td>
					<td>{item.description}</td>
					<td>
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
							Share
						</button>

						<button ref="deleteButton" onClick={this.handleInlineEditClick.bind(this, index)} className="btn btn-default edit btn-xs">
							<span className="glyphicon glyphicon-pencil" ></span>
							Edit
						</button>
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