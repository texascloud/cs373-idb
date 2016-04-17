import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { CompaniesTable } from './companies.jsx'


export default class SearchResults extends React.Component {
  render() {
    console.log('Render of "search-results"');
    // console.log(this.props.location);
    console.log(this.props.location.state);
    return (
      <div>
        <h1>Search results will eventually appear here! :)</h1>
        {CompaniesTable(this.props.location.state)}
      </div>
    )
  }
}
