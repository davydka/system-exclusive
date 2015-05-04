var React = require('react');

module.exports = React.createClass({
	render: function(){
		return <button onClick={this.props.whenClicked} type="button" className={"btn" + this.props.className}>
			{this.props.title}
			<span className={this.props.subTitleClassName}>
				{this.props.subTitle}
			</span>
		</button>
	}
});