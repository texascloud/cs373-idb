import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { CompaniesTable } from './companies.jsx'
import { GamesTable } from './games.jsx'


export default class SearchResults extends React.Component {
  render() {
    console.log('Render of "search-results"');
    console.log(this.props.location.state);
    let data = this.props.location.state;
    if (data.length === 0) {
      return (
        <h1>No results matching that query</h1>
      )
    }
    else {
      return (
        <div>
          <h1>Search results will eventually appear here! :)</h1>
          {CompaniesTable(data.companies)}
          {GamesTable(data.games)}
        </div>
      )
    }
  }
}
