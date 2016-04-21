import React from 'react'
import { render } from 'react-dom'
import { Table } from 'reactable'
import { CompaniesTable } from './companies.jsx'
import { GamesTable } from './games.jsx'
import { YearsTable } from './years.jsx'


export default class SearchResults extends React.Component {
  render() {
    console.log('Render of "search-results"');
    console.log(this.props.location);
    const data = this.props.location.state;
    const queryTerms = this.props.location.query.terms;
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
          {CompaniesTable(and.companies, queryTerms)}
          {GamesTable(and.games, queryTerms)}
          {YearsTable(and.years, queryTerms)}
        </div>
      )
    }
    else if (data.and.length === 0 && data.or.length === 1) {
      const or = data.or[0];
      return (
        <div>
          <h1><u>Or results</u></h1>
          {CompaniesTable(or.companies, queryTerms)}
          {GamesTable(or.games, queryTerms)}
          {YearsTable(or.years, queryTerms)}
        </div>
      )
    }
    else {
      const and = data.and[0];
      const or = data.or[0];
      return (
        <div>
          <h1><u>And results</u></h1>
            {CompaniesTable(and.companies, queryTerms)}
            {GamesTable(and.games, queryTerms)}
            {YearsTable(and.years, queryTerms)}
          <h1><u>Or results</u></h1>
          {CompaniesTable(or.companies, queryTerms)}
          {GamesTable(or.games, queryTerms)}
          {YearsTable(or.years, queryTerms)}
        </div>
      )
    }
  }
}
