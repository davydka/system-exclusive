var React = require('react');
var S = require('string');


module.exports = React.createClass({
	getInitialState: function(){ // React method
		return {
			images: [],
			after: ""
		}
	},
	componentDidMount: function(){ // React method
		this.getData();
	},
	getData: function(){ // User authored js method
		$.get(this.props.source+"?after="+this.state.after, function(result){
			console.log(this.state.images);
			var newImages = this.state.images.concat(result.data.children);
			this.setState({
				after: result.data.after,
				images: newImages
			}, function(){
				TweenMax.ticker.addEventListener("tick", this.scrollEvent.bind(this));
			});
		}.bind(this));
	},
	scrollEvent: function(){ // User authored js method
		var height = (document.body.scrollHeight - window.innerHeight) - 500;
		if(document.body.scrollTop > height){
			TweenMax.ticker.removeEventListener("tick", this.scrollEvent);
			this.getData();
		}
	},
	buildList: function(){ // User authored js method
		return this.state.images.map(function(item){
			var url = item.data.url;

			// We don't want self reddit posts, nor do we want any vine or youtube stuff, just imgur gifs
			if(item.data.is_self || !S(url).contains("imgur") || S(url).contains("gallery") || S(url).contains("m.imgur")){
				return;
			}

			// Find imgur.com links and reformat them to their direct image url
			if(!S(url).startsWith("http://i.")){
				url = S(url).replaceAll("http://imgur.com", "http://i.imgur.com").s;
			}

			// Clean all file endings and change to .webm
			url = S(url).strip(".gifv", ".jpg", ".gif").s;
			url = S(url).ensureRight(".webm").s;

			//return <img src={url} />
			return <div className="">
				<video autoPlay loop="true"><source src={url}/></video>
			</div>;
		});
	},
	render: function(){ // React method
		var listItems = this.buildList();

		return <div>
			<h1>Infinite Gif</h1>
			<div className="">{listItems}</div>
		</div>;
	}
});