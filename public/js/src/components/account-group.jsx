var React = require('react');

module.exports = React.createClass({
	handleSaveClick1: function(){
		this.props.handleSaveClick1();
	},

	render:function(){
		if(typeof this.props.userId == 'undefined'){
			return <div className="btn-group account-group" role="group" >
				<button ref="loginButton" className="btn btn-default login ">
					<a href="/login">Login</a>
				</button>
				<button ref="signupButton" className="btn btn-default signup ">
					<a href="/register">Signup</a>
				</button>
			</div>;
		} else {
			return <div className="btn-group account-group" role="group" >
				<button ref="logoutButton" className="btn btn-default logout ">
					<a href="/logout">Logout</a>
				</button>
			</div>;
		}
	}
});