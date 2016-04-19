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
    let inputBar = document.getElementById("searchTerm");
    // Get user input
    const searchTerm = inputBar.value;
    this.serverRequest = $.get('/api/search/'+searchTerm, function (result) {
      this.setState({
        data: result
      });
      const location = {
        pathname: '/search',
        state: result
      };
      // Send user to search page, as well as passing GET request
      // results to the page to be rendered
      browserHistory.push(location);
      // Reset the search bar input to the placeholder text
      inputBar.value = "";
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
