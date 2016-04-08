import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

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
               {
                  column: ' Year',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children;
                  var nameB = b.props.children;
                  return nameA > nameB ? 1 : -1;
                  }
                },
                'Average Rating',
                'Most popular genre',
                'Number of Companies Founded',
                'Number of Games'
                ]}
             defaultSort={{column: ' Year', direction: 'desc'}}
             itemsPerPage={6} pageButtonLimit={10}
             defaultSortAscending />
      )
  }
}
