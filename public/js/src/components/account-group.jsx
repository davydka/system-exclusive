var React = require('react');

module.exports = React.createClass({
	handleSaveClick1: function(){
		this.props.handleSaveClick1();
	},

	render:function(){
		var returnTo = '';
		if(this.props.isDetail){
			returnTo = '?returnTo='+location.pathname;
		}

		if(typeof this.props.userId == 'undefined'){
			return <div className="btn-group account-group" role="group" >
				<button ref="loginButton" className="btn btn-default login ">
					<a href={"/login"+returnTo}>Login</a>
				</button>
				<button ref="signupButton" className="btn btn-default signup ">
					<a href={"/register"+returnTo}>Signup</a>
				</button>
			</div>;
		} else {
			return <div className="btn-group account-group" role="group" >
				<button ref="logoutButton" className="btn btn-default logout ">
					<a href={"/logout"+returnTo}>Logout</a>
				</button>
			</div>;
		}
	}
});