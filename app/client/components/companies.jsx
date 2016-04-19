import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { arrWithoutTerm } from '../utils/helpers.js'

export default class Companies extends React.Component {
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
      var columns = arrWithoutTerm(companies, 'company_id');
      var reformattedCompanies = companies.map(function(obj) {
        var comp = obj;
        var id = comp['company_id'];
        var name = comp[' Company'];
        var year = comp['Year Founded'];
        comp['name'] = name;
        comp[' Company'] = <Link to={"/companies/"+id}>{name}</Link>;
        comp['Year Founded'] = <Link to={"/years/"+year}>{year}</Link>;
        delete comp.company_id;
        return comp;
      });
      return (
        <Table data={reformattedCompanies}
               columns={columns}
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
                'Number of Games Published'
                ]}
               defaultSort={{column: ' Company', direction: 'asc'}}
               filterable={['name', 'Year Founded', 'Average Rating']}
               filterPlaceholder='Filter by Title, Genre, Console, or Rating'
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortAscending/>
        );
    }
  }
}

export function CompaniesTable(data) {
  var companies = data;
  var columns = arrWithoutTerm(companies, 'company_id');
  var reformattedCompanies = companies.map(function(obj) {
    var comp = obj;
    var id = comp['company_id'];
    var name = comp[' Company'];
    var year = comp['Year Founded'];
    comp['name'] = name;
    comp[' Company'] = <Link to={"/companies/"+id}>{name}</Link>;
    comp['Year Founded'] = <Link to={"/years/"+year}>{year}</Link>;
    return comp;
  });
  return (
    <Table data={reformattedCompanies}
           columns={columns}
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
                'Number of Games Published'
                ]}
           defaultSort={{column: ' Company', direction: 'asc'}}
           filterPlaceholder='Filter by Title, Genre, Console, or Rating'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortAscending/>
  )
}
