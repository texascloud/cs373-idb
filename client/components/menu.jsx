import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

export default class Menu extends React.Component {
    render() {
        return (
          <nav className="navbar navbar-dark bg-inverse">
            <Link className="navbar-brand" to="/">Games Observatory</Link>
            <div className="nav navbar-nav">
              <Link activeClassName="active" className="nav-item nav-link" to="/about">About</Link>
              <Link activeClassName="active" className="nav-item nav-link" to="/companies">Companies</Link>
              <Link activeClassName="active" className="nav-item nav-link" to="/games">Games</Link>
              <Link activeClassName="active" className="nav-item nav-link" to="/years">Years</Link>
            </div>
          </nav>
        );
    }
}