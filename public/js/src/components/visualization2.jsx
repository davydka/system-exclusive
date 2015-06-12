var React	= require('react');

module.exports = React.createClass({

	init: function(){

	},

	buildRows: function(){
		var rowsArray= [];
		var divStyle = {};

		this.props.sysex.map(function(item, index){
			item.map(function(innerItem, innerIndex){
				divStyle = {
					backgroundColor: "rgb("+innerItem+", 0, 0)"
				}

				rowsArray.push(<span style={divStyle} className="thing"></span>)
			}.bind(this));
		}.bind(this));

		return <div className="rows">
			{rowsArray}
		</div>
	},

	componentDidMount: function(){
		this.init();
	},

	render: function(){
		var rows = this.buildRows();

		return <div className="visualization" id="visualization">
			{rows}
		</div>
	}
})