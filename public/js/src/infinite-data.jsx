var React = require('react');
var S = require('string');

var ListItem = require('./list-item');


module.exports = React.createClass({
	getInitialState: function(){ // React method
		return {
			images: [],
			// Setting state with props is usually bad, unless the prop is just an intializer
			// https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
			after: this.props.initialAfter
		}
	},

	componentDidMount: function(){ // React method
		this.getData();
	},

	getData: function(){ // User authored js method
		$.get(this.props.source+"?after="+this.state.after, function(result){
			var newImages = this.state.images.concat(result.data.children);
			if(this.isMounted()){
				this.setState({
					after: result.data.after,
					images: newImages
				}, function(){
					var obj = { Url: location.origin+"?after="+this.state.after };
					history.pushState(obj, "", obj.Url);

					TweenMax.ticker.addEventListener("tick", this.infiniteScroll.bind(this));
				});
			}
		}.bind(this));
	},

	infiniteScroll: function(){ // User authored js method
		var height = (document.body.scrollHeight - window.innerHeight) - 500;
		if(document.body.scrollTop > height){
			TweenMax.ticker.removeEventListener("tick", this.infiniteScroll);
			this.getData();
		}
	},

	buildList: function(){ // User authored js method
		return this.state.images.map(function(item){
			var url = item.data.url;
			//console.log(url);

			// We don't want self reddit posts, nor do we want any vine or youtube stuff, just imgur gifs
			if(item.data.is_self || !S(url).contains("imgur") || S(url).contains("gallery") || S(url).contains("/a/") || S(url).contains("m.imgur")){
				return;
			}

			// Find imgur.com links and reformat them to their direct image url
			if(!S(url).startsWith("http://i.")){
				url = S(url).replaceAll("http://imgur.com", "http://i.imgur.com").s;
			}

			// Clean all file endings and change to .webm (or .gif for mobile)
			url = S(url).strip(".gifv", ".jpg", ".gif").s;


			if(this.props.mobile.mobile()){
				url = S(url).ensureRight(".gif").s;
			} else {
				url = S(url).ensureRight(".webm").s;
			}

			return <ListItem {...this.props} url={url}></ListItem>
		}.bind(this));
	},

	render: function(){ // React method
		var listItems = this.buildList();

		return <div>
			<h1>Infinite Gif</h1>
			<div className="">{listItems}</div>
		</div>;
	}
});