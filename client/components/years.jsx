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
      return (<div><h2>Loading data..... Or something failed :)</h2></div>)
    }
    let years = this.state.data;
    var reformattedYears = years.map(function(obj) {
      var y = obj;
      var id = y['year_id'];
      y['year_id'] = <Link to={"/years/"+id}>{id}</Link>;
      return y;
    });
    return (
      <Table data={reformattedYears}
             sortable={[
               {
                  column: 'year_id',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children;
                  var nameB = b.props.children;
                  console.log(nameA);
                  return nameA > nameB;
                  }
                },
                'avg_rating',
                'num_games',
                'num_companies_founded',
                'most_popular_genre'
                ]}
             defaultSort={{column: 'Year', direction: 'desc'}}
             filterable={['Year']}
             filterPlaceholder='Filter by Years, Number of Games, Most Popular Genre, Average Rating, or Who Made Games'
             itemsPerPage={6} pageButtonLimit={10}
             defaultSortDescending />
      )
  }
}
