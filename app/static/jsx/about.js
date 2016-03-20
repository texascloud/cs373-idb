var AboutCard = React.createClass({
    render: function() {
        return (
			<div className="card">
				<div className="member-name text-xs-center">
					<h1>{this.props.name}</h1>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<img className="card-img-top img-responsive" src="/static/img/kirby.png" alt="Card image cap" />
					</div>
					<div className="col-sm-6">
                        <p className="member-bio">{this.props.bio}</p>
					</div>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item"><b>Major Responsibilities:</b> {this.props.duties}</li>
					<li className="list-group-item"><b># Commits:</b> {this.props.commits}</li>
					<li className="list-group-item"><b># Issues:</b> {this.props.issues}</li>
					<li className="list-group-item"><b># Unit Tests:</b> {this.props.tests}</li>
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
                        bio="Write short bio here"
                        duties="List responsibilities here"
                        commits="0"
                        issues="0"
                        tests="0"/>
                    <AboutCard
                            name="Will Ripley"
                            bio="Write short bio here"
                            duties="List responsibilities here"
                            commits="0"
                            issues="0"
                            tests="0"/>
                </div>
				<div className="row">
                    <AboutCard
                            name="Doug Wiley"
                            bio="Write short bio here"
                            duties="List responsibilities here"
                            commits="0"
                            issues="0"
                            tests="0"/>
                    <AboutCard
                            name="Jerry Pon"
                            bio="Write short bio here"
                            duties="List responsibilities here"
                            commits="0"
                            issues="0"
                            tests="0"/>
				</div>
				<div className="row">
					<div className="col-md-12">
						<AboutCard
								name="Joshua Hurt"
								bio="Write short bio here"
								duties="List responsibilities here"
								commits="0"
								issues="0"
								tests="0"/>
						</div>
				</div>
            </div>
		);
	}
});

React.render(
	<AboutList />,
	document.getElementById('about-team-cards')
);
