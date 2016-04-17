import React from 'react'
import { render } from 'react-dom'
import SearchBar from 'react-search-bar'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

export default class Menu extends React.Component {
  handleClick(searchTerm) {
    console.log('SEARCH SOME STUFF');
    this.serverRequest = $.get('/api/search/'+searchTerm, function (result) {
      this.setState({
        data: result
      });
      console.log(result);
    }.bind(this));
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
            <SearchBar
              onChange={(searchTerm, resolve) => {

              }}
              onSubmit={(searchTerm) => {
                this.handleClick(searchTerm);
                console.log(searchTerm);
              }} />
          </div>
        </nav>
      );
  }
}