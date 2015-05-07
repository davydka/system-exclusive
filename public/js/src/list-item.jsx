var React = require('react');

module.exports = React.createClass({
	render:function(){
		if(this.props.mobile.mobile()){
			return <div className="list-item-holder">
				<img className="list-item" src={this.props.url} />
			</div>;
		} else {
			return <div className="list-item-holder">
				<video className="list-item" autoPlay loop="true"><source src={this.props.url}/></video>
			</div>;
		}
	}
});