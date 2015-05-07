var React = require('react');

var Video = require('./video');
var Image = require('./image');

module.exports = React.createClass({
	render:function(){
		if(this.props.mobile.mobile()){
			return <div className="list-item-holder">
				<Image {...this.props} className="list-item" />
			</div>;
		} else {
			return <div className="list-item-holder">
				<Video {...this.props} className="list-item"></Video>
			</div>;
		}
	}
});