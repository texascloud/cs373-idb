import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

export const year_data = [
    {Year: <Link to="/years/1996">1996</Link>, 'Number of Games': '1','Most Popular Genre': 'Platform', 'Average Rating':'5.0', 'Number of Companies Founded': '1'},
    {Year: <Link to="/years/2001">2001</Link>, 'Number of Games': '1', 'Most Popular Genre': 'Platform', 'Average Rating':'4.2', 'Number of Companies Founded' : '1'},
    {Year: <Link to="/years/2008">2008</Link>, 'Number of Games': '1', 'Most Popular Genre': 'Action-Adventure', 'Average Rating':'4.9', 'Number of Companies Founded' : '0'}
];

export default class Years extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <Table data={year_data}
             sortable={true}
             defaultSort={{column: 'Year', direction: 'desc'}}
             filterable={['Year']}
             filterPlaceholder='Filter by Years, Number of Games, Most Popular Genre, Average Rating, or Who Made Games'
             itemsPerPage={6} pageButtonLimit={10}
             defaultSortDescending />
      )
  }
}
