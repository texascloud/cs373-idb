var GithubStats = React.createClass({
	render: function() {
		return (
			<div className="github-stats">
                <li className="list-group-item"><b># Commits:</b> {this.props.commits}</li>
                <li className="list-group-item"><b># Issues:</b> {this.props.issues}</li>
                <li className="list-group-item"><b># Unit Tests:</b> {this.props.tests}</li>
            </div>
		);
	}
});


var GithubCard = React.createClass({
    render: function() {
        return (
                <div className="card">
                    <div className="member-name text-xs-center">
                        <h1>{this.props.name}</h1>
                    </div>
                    <ul className="list-group list-group-flush">
                        <GithubStats commits={this.props.commits}
                                     issues={this.props.issues}
                                     tests={this.props.tests}/>
                    </ul>
                    <div className="card-block">
                        <div className="row">
                            <div className="col-sm-3">
                                <a href="https://jsapi.apiary.io/previews/gamesobservatory/reference" className="member-link">Apiary API</a>
                            </div>
                            <div className="col-sm-3">
                                <a href="https://github.com/CamelBackNotation/cs373-idb/issues" className="member-link">Github Issue Tracker</a>
                            </div>
                            <div className="col-sm-3">
                                <a href="https://github.com/CamelBackNotation/cs373-idb" className="member-link">Github Repo</a>
                            </div>
                            <div className="col-sm-3">
                                <a href="https://github.com/CamelBackNotation/cs373-idb/wiki" className="member-link">Github Wiki</a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
});

var AboutCard = React.createClass({
    render: function() {
        return (
			<div className="card">
				<div className="member-name text-xs-center">
					<h1>{this.props.name}</h1>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<img className="img-responsive" src={this.props.avatar ? this.props.avatar : "/static/img/kirby.png"}/>
					</div>
					<div className="col-sm-6">
                        <p className="member-bio">{this.props.bio}</p>
					</div>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item"><b>Major Responsibilities:</b> {this.props.duties}</li>
					<GithubStats commits={this.props.commits}
								 issues={this.props.issues}
								 tests={this.props.tests}/>
				</ul>
				<div className="card-block">
					<div className="row">
						<div className="col-sm-6">
                            <a href="#" className="member-link">Github</a>
                        </div>
						<div className="col-sm-6">
							<a href="#" className="member-link">Placeholder</a>
						</div>
                    </div>
				</div>
			</div>
  		);
    }
});

var AboutList = React.createClass({
	render:function() {
		return (
			<div className="aboutList">
				<div className="row">
                    <AboutCard
                        name="James Huang"
						avatar=""
                        bio="I am James, yes"
                        duties="Docker, Frontend"
                        commits="5"
                        issues="4"
                        tests="3"/>
                    <AboutCard
                            name="Will Ripley"
							avatar="/static/img/will.jpg"
                            bio="I am a CS and MIS double major at UT Austin."
                            duties="Frontend, Database, REST API documentation, Technical Report"
                            commits="11"
                            issues="2"
                            tests="12"/>
                </div>
				<div className="row">
                    <AboutCard
                            name="Doug Wiley"
							avatar="/static/img/placeholder.jpg"
                            bio="Write short bio here"
                            duties="List responsibilities here"
                            commits="1"
                            issues="5"
                            tests="4"/>
                    <AboutCard
                            name="Jerry Pon"
							avatar=""
                            bio="Write short bio here"
                            duties="List responsibilities here"
                            commits="9"
                            issues="2"
                            tests="1"/>
				</div>
				<div className="row">
					<div className="col-md-12">
						<AboutCard
								name="Joshua Hurt"
								avatar=""
								bio="Write short bio here"
								duties="List responsibilities here"
								commits="18"
								issues="7"
								tests="4"/>
						</div>
				</div>
            </div>
		);
	}
});

ReactDOM.render(
	<AboutList />,
	document.getElementById('about-team-cards')
);

ReactDOM.render(
		<GithubCard name="Total Coding Stats"
					commits="103789"
					issues="50"
					tests="2"
					apiary=""
					gh-issues=""
					gh-repo=""
					gh-wiki=""/>,
		document.getElementById('about-github-stats')
);
