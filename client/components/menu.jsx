import React from 'react'
import { render } from 'react-dom'
// import SearchBar from 'react-search-bar'
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
            <SearchBar />
          </div>
        </nav>
      );
  }
}

class SearchBar extends React.Component {
  handleClick() {
    let searchTerm = document.getElementById("searchTerm").value;
    console.log('SEARCH SOME STUFF');
    console.log(searchTerm);
    this.serverRequest = $.get('/api/search/'+searchTerm, function (result) {
      this.setState({
        data: result
      });
      let location = {
        pathname: '/search',
        state: result
      };
      browserHistory.push(location);
    }.bind(this));
  }
  componentWillMount() {
    this.setState({data: null});
  }
  render() {
    return (
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input id="searchTerm" className="form-control" type="text"  placeholder="Search for..." />
            <button onClick={this.handleClick.bind(this)} type="button" className="btn btn-default">Submit</button>
          </div>
        </form>
    )
  }
}
