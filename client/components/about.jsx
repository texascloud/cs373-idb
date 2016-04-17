import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'


class RaisedButtonSimple extends React.Component {
  handleClick() {
    this.setState({data: 'running'});
    this.serverRequest = $.get('/api/tests', function (result) {
      this.setState({
        data: result
      })
    }.bind(this));
  }
  componentWillMount() {
    this.setState({data: null});
  }
  render() {
    const style = {
         margin: 12
    };
    if (this.state.data === null) {
      return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Press Me I'm a button!</button>
        <textarea rows="7" type="text" id="add" name="results" value="" />
      </div>
      )
    }
    else if (this.state.data === 'running') {
      return (
        <div>
          <button>Running tests...</button>
          <textarea rows="7" type="text" id="add" name="results" value={this.state.data.output} />
        </div>
      )
    }
    else {
      return (
        <div>
          <button>Test results below</button>
          <textarea rows="7" type="text" id="add" name="results" value={this.state.data} />
        </div>
      )
    }
  }
}




var GithubStats = React.createClass({
    render: function() {
        return (
          
          <div className="github-stats">
          <section id="about">
              <li className="list-group-item"><b># Commits:</b> {this.props.commits}</li>
              <li className="list-group-item"><b># Issues:</b> {this.props.issues}</li>
              <li className="list-group-item"><b># Unit Tests:</b> {this.props.tests}</li>
              </section>
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
          <div className="card col-lg-4 col-sm-6">
              <div className="member-name text-xs-center">
                  <h1>{this.props.name}</h1>
              </div>
              <div className="row">
                  <div className="col-sm-6">
                      <img className="img-responsive img-circle" src={this.props.avatar ? this.props.avatar : "/static/img/kirby.png"}/>
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
                      <div className="col-sm-offset-4 col-sm-4">
                          <a href={this.props.github} className="member-link">Github</a>
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
          <section id="about">
              <div className="row inner">
                  <AboutCard
                    name="James Huang"
                    avatar="/static/img/james.png"
                    bio="He is James, and yes. He likes Geico gaming and loves lobster rolls."
                    duties="Docker, frontend design, hype man"
                    commits="21"
                    issues="2"
                    tests="3"/>
                  <AboutCard
                    name="Will Ripley"
                    avatar="/static/img/will.png"
                    bio="He is just a CS and MIS double major at UT Austin."
                    duties="Frontend, Database, REST API documentation, Technical Report"
                    commits="24"
                    issues="15"
                    tests="10"/>
              </div>
              </section>
              <section id="about">
              <div className="row inner">
                  <AboutCard
                    name="Doug Wiley"
                    avatar="/static/img/doug.png"
                    bio="Doug likes hot wheels. And he likes lobster a lot. "
                    duties="API, end-points"
                    commits="26"
                    issues="5"
                    tests="6"/>
                  <AboutCard
                    name="Jerry Pon"
                    avatar="/static/img/jerry.png"
                    bio="Jerry loves Halo. He's a Spartan."
                    duties="Technical report, static page"
                    commits="12"
                    issues="2"
                    tests="1"/>
              </div>
              </section>
              <section id="about">
              <div className="row inner">
                      <AboutCard
                        name="Joshua Hurt"
                        avatar="/static/img/josh.png"
                        bio="Josh is a top 10% Brawhalla player. Once upon a time his computer got rained on; he dried it out."
                        duties="React, backend, framework, everything pretty much"
                        commits="45"
                        issues="22"
                        tests="2"
                        github="https://github.com/CamelBackNotation"/>
              </div>
              </section>
          </div>
        );
    }
});

export default class About extends React.Component {
    render() {
        return (
          <section id="about">
          <RaisedButtonSimple />
          <div id="about-page">
            <div className="inner">
            <AboutList />
            <GithubCard name="Total Coding Stats"
            commits="166"
            issues="35"
            tests="20"
            apiary="https://jsapi.apiary.io/previews/gamesobservatory/reference"
            gh-issues="https://github.com/CamelBackNotation/cs373-idb/issues"
            gh-repo="https://github.com/CamelBackNotation/cs373-idb"
            gh-wiki="https://github.com/CamelBackNotation/cs373-idb/wiki"
              />
            </div>
          </div>
          </section>
        );
    }
}
