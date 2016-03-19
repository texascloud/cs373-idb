var AboutCard = React.createClass({
    render: function() {
		var placeholder_bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius at sem sit amet volutpat. ";
        return (
		  <div className="card">
		    <div className="card-header text-xs-center">
		    <h3>{this.props.name}</h3>
		    </div>
		    <div className="row">
		      <div className="col-sm-4">
		      	<h2>img placeholder</h2>
		      </div>
		      <div className="col-sm-8">
		        <div className="card-block">
		          <p className="card-text">{this.props.bio ? this.props.bio : placeholder_bio}</p>
		        </div>
		      </div>
		    </div>
		    <ul className="list-group list-group-flush">
		      <li className="list-group-item"><b>Major Responsibilities:</b> {this.props.responsibilities}</li>
		      <li className="list-group-item"><b># Commits:</b> {this.props.commits}</li>
		      <li className="list-group-item"><b># Issues:</b> {this.props.issues}</li>
		      <li className="list-group-item"><b># Unit Tests:</b> {this.props.tests}</li>
		    </ul>
		    <div className="card-block">
		      <a href="#" className="card-link">Card link</a>
		      <a href="#" className="card-link">Placeholder link</a>
		    </div>
		  </div>   
  		);
    }
});

var AboutList = React.createClass({
	render:function() {
		return (
			<div className="row">
				<div className="col-md-6">
					<AboutCard name="Joshua Hurt" />
				</div>
				<div className="col-md-6">
					<AboutCard name="Doug Wiley" />
				</div>
			</div>

			<div className="row">
				<div className="col-md-6">
					<AboutCard name="Will Ripley" />
				</div>
				<div className="col-md-6">
					<AboutCard name="Jerry Pon" />
				</div>
			</div>

			<div className="row">
				<div className="col-md-6">
					<AboutCard name="James Huang" />
				</div>
			</div>
			);
	}
});

ReactDOM.render(
    <AboutList />,
    document.getElementById('about-member-info')
);

