import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

export default class Companies extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/companies', function (result) {
      this.setState({
        data: result
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    if (this.state.data === null) {
      return (<div><h1>Waiting to load data...</h1></div>)
    }
    else {
      var companies = this.state.data;
      var reformattedCompanies = companies.map(function(obj) {
        var comp = obj;
        var id = comp['company_id'];
        var name = comp['name'];
        comp['name'] = <Link to={"/companies/"+id}>{name}</Link>;
        delete comp.company_id;
        return comp;
      });
      return (
        <Table data={reformattedCompanies}
               sortable={[
               {
                  column: 'name',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children.toLowerCase();
                  var nameB = b.props.children.toLowerCase();

                  return nameA.localeCompare(nameB);
                  }
                },
                'avg_rating',
                'num_published',
                'year_founded',
                'num_developed'
                ]}
               defaultSort={{column: 'name', direction: 'desc'}}
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortDescending/>
        );
    }
  }
}


