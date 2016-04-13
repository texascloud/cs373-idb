import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

export default class Menu extends React.Component {
  handleClick() {
    console.log('SEARCH SOME STUFF');
  }
  render() {
      return (
        <nav className="navbar navbar-dark bg-inverse">
          <Link className="navbar-brand" to="/">Games Observatory</Link>
          <div className="nav navbar-nav">
            <Link activeClassName="active" className="nav-item nav-link" to="/about">About</Link>
            <Link activeClassName="active" className="nav-item nav-link" to="/companies">Companies</Link>
            <Link activeClassName="active" className="nav-item nav-link" to="/games">Games</Link>
            <Link activeClassName="active" className="nav-item nav-link" to="/years">Years</Link>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for...">
                <span className="input-group-btn">
                  <button onClick={this.handleClick.bind(this)} className="btn btn-default" type="button">Go!</button>
                </span>
              </input>
            </div>
          </div>
        </nav>
      );
  }
}