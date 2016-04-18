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
    if (data.and.length === 0) {
      return (
        <h1>No results matching that query</h1>
      )
    }
    else if (data.or.length === 0) {
      return (
        <div>
          <h1>Search results will eventually appear here! :)</h1>
          {CompaniesTable(data.and.companies)}
          {GamesTable(data.and.games)}
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Search results will eventually appear here! :)</h1>
          <h1>And results</h1>
            {CompaniesTable(data.and.companies)}
            {GamesTable(data.and.games)}
          <h1>Or results</h1>
          {CompaniesTable(data.or.companies)}
          {GamesTable(data.or.games)}
        </div>
      )
    }
  }
}
