import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { arrWithoutTerm, highlightTerms, sortColumn } from '../utils/helpers'

export default class Years extends React.Component {
  constructor() {
    super();

  }
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/years', function (result) {
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
    let years = this.state.data;
    var reformattedYears = years.map(function(obj) {
      var y = obj;
      var id = y[' Year'];
      y[' Year'] = <Link to={"/years/"+id}>{id}</Link>;
      return y;
    });
    return (
      <Table data={reformattedYears}
             sortable={[
                sortColumn(' Year', 1),
                'Average Rating',
                'Most Popular Genre',
                'Number of Companies Founded',
                'Number of Games'
                ]}
             defaultSort={{column: ' Year', direction: 'desc'}}
             itemsPerPage={6} pageButtonLimit={10}
             defaultSortAscending />
      )
  }
}


export function YearsTable(data, query) {
  let years = data;
  const tmp = query.split(' ').join('|');
  var terms = new RegExp(tmp, "i");
  if (data.length !== 0) {
    var columns = arrWithoutTerm(years, 'year_id');
    var reformattedYears = years.map(function(obj) {
      let y = obj;
      let id = y[' Year'];
      y['year'] = y[' Year'];
      y['Most Popular Genre'] = highlightTerms(y['Most Popular Genre'], terms);
      y['Average Rating'] = highlightTerms(y['Average Rating'], terms);
      let boldedYear = highlightTerms(id, terms);
      y[' Year'] = <Link to={"/years/"+id}>{boldedYear}</Link>;
      return y;
    });
  }
  return (
    <Table data={reformattedYears}
           columns={columns}
           sortable={[
                sortColumn(' Year', 1),
                sortColumn('Most Popular Genre', 1),
                sortColumn('Average Rating', 1),
                'Number of Companies Founded',
                'Number of Games'
                ]}
           defaultSort={{column: ' Year', direction: 'desc'}}
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortAscending />
  )
}

// {
//   column: ' Year',
//     sortFunction: function(a, b) {
//   var nameA = a.props.children;
//   var nameB = b.props.children;
//   return nameA > nameB ? 1 : -1;
// }
// },
