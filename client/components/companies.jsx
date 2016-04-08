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
      return (<div></div>)
    }
    else {
      var companies = this.state.data;
      var reformattedCompanies = companies.map(function(obj) {
        var comp = obj;
        var id = comp['company_id'];
        var name = comp[' Company'];
        var year = comp['Year Founded'];
        comp[' Company'] = <Link to={"/companies/"+id}>{name}</Link>;
        comp['Year Founded'] = <Link to={"/years/"+year}>{year}</Link>;
        delete comp.company_id;
        return comp;
      });
      return (
        <Table data={reformattedCompanies}
               sortable={[
               {
                  column: ' Company',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children.toLowerCase();
                  var nameB = b.props.children.toLowerCase();

                  return nameA.localeCompare(nameB);
                  }
                },
               {
                  column: 'Year Founded',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children;
                  var nameB = b.props.children;
                  return nameA > nameB ? 1 : -1;
                  }
                },
                'Average Rating',
                'Number of Games Developed',
                'Number of Games Published',
                ]}
               defaultSort={{column: ' Company', direction: 'asc'}}
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortAscending/>
        );
    }
  }
}


