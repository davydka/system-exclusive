#Boilerplate Template for Javascript Apps

##Getting Started

* Make sure gulp is installed globally: `npm install gulp -g`
* For deployments, make sure heroku CLI tools are installed: [https://toolbelt.heroku.com/](https://toolbelt.heroku.com/)
* Clone the repo: `git clone https://github.com/codeandtheory/burger-king-onion-ring-toss-3d.git  folder-name`
* Enter your repo's directory: `cd folder-name`
* Remove this init from the git remote: `git remote rm origin`
* If needed, create your new github repo from the command line: `curl -u 'USER' https://api.github.com/user/repos -d '{"name":"repo"}'`
	* replace USER with your username and REPO with your repository/application name!
* add the remote: `git remote add origin git@github.com:user/repo.git`
* push to your new repo: `git push origin master`
* Install server side dependancies: `npm install`
* Install front end libraries/frameworks: `bower install`
* Run the server for local development: `gulp serve` or just `gulp`
