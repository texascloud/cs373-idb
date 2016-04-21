import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { arrWithoutTerm, highlightTerms, sortColumn } from '../utils/helpers.js'

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

export function CompaniesTable(data, query) {
  var companies = data;
  let tmp = query.toString().split(' ').join('|');
  var terms = new RegExp(tmp, "i");
  if (data.length !== 0) {
    var columns = arrWithoutTerm(companies, 'company_id');
    var reformattedCompanies = companies.map(function(obj) {
      let comp = obj;
      let id = comp['company_id'];
      let name = comp[' Company'];
      let year = comp['Year Founded'];
      let rating = comp['Average Rating'];
      comp['name'] = name;
      // Highlight any search terms in the object attributes
      comp['Average Rating'] = highlightTerms(rating, terms);
      let boldedName = highlightTerms(name, terms);
      let boldedYear = highlightTerms(year, terms);
      comp[' Company'] = <Link to={"/companies/"+id}>{boldedName}</Link>;
      comp['Year Founded'] = <Link to={"/years/"+year}>{boldedYear}</Link>;
      return comp;
    });

  }
  return (
    <Table data={reformattedCompanies}
           columns={columns}
           sortable={[
                sortColumn(' Company', 2),
                sortColumn('Year Founded', 2),
                sortColumn('Average Rating', 1),
                'Number of Games Developed',
                'Number of Games Published'
                ]}
           defaultSort={{column: ' Company', direction: 'asc'}}
           filterPlaceholder='Filter by Title, Genre, Console, or Rating'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortAscending/>
  )
}


// {
//   column: ' Company',
//     sortFunction: function(a, b) {
//   var nameA = a.props.children.toLowerCase();
//   var nameB = b.props.children.toLowerCase();
//
//   return nameA.localeCompare(nameB);
// }
// },
