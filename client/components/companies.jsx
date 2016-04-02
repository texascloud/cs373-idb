import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

const company_data = [
  {Name: <Link to="/companies/1">Naughty Dog </Link>, Developed: 60, Published: 581,
    Founded:'1994', 'Avg Rating':82*0.05},
  {Name: <Link to="/companies/2">Bungie </Link>, Developed: 8, Published: 363,
    Founded:'1989', 'Avg Rating':77*0.05},
  {Name: <Link to="/companies/3">Bethesda Softworks</Link>, Developed: 17, Published: 1,
    Founded:'2003', 'Avg Rating':81*0.05}
];

export default class Companies extends React.Component {
  constructor() {
    super();
    this.state = {
      data: company_data
    }
  }
  render() {
      return (
        <Table data={this.state.data}
               sortable={true}
               defaultSort={{column: 'Name', direction: 'desc'}}
               filterable={['Name', 'Avg Rating']}
               filterPlaceholder='Filter by Name or Avg Rating...'
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortDescending/>
        );
  }
}


