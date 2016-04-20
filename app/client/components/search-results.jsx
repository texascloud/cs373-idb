import React from 'react'
import { render } from 'react-dom'
import { Table } from 'reactable'
import { CompaniesTable } from './companies.jsx'
import { GamesTable } from './games.jsx'


export default class SearchResults extends React.Component {
  render() {
    console.log('Render of "search-results"');
    console.log(this.props.location.state);
    const data = this.props.location.state;
    if (data.and.length === 0 && data.or.length === 0) {
      return (
        <h1>No results matching that query</h1>
      )
    }
    else if (data.and.length === 1 && data.or.length === 0) {
      const and = data.and[0];
      return (
        <div>
          <h1><u>And results</u></h1>
          {CompaniesTable(and.companies)}
          {GamesTable(and.games)}
        </div>
      )
    }
    else if (data.and.length === 0 && data.or.length === 1) {
      const or = data.or[0];
      return (
        <div>
          <h1><u>Or results</u></h1>
          {CompaniesTable(or.companies)}
          {GamesTable(or.games)}
        </div>
      )
    }
    else {
      console.log('and: '+data.and.length);
      console.log('or: '+data.or.length);
      const and = data.and[0];
      const or = data.or[0];
      return (
        <div>
          <h1><u>And results</u></h1>
            {CompaniesTable(and.companies)}
            {GamesTable(and.games)}
          <h1><u>Or results</u></h1>
          {CompaniesTable(or.companies)}
          {GamesTable(or.games)}
        </div>
      )
    }
  }
}
