import React from 'react'
import GenericTable from './generic-table.jsx'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

export default class YearPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.yearID);
    console.log(this.props);
  }
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/years/'+this.props.params.yearID, function (result) {
      this.setState({
        data: result
      });
    }.bind(this));

  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    let id = this.props.params.yearID;
    if (this.state.data === null) {
      return (<div><h1>Loading data... Or something bad happened :)</h1></div>)
    }
    else {
      let year = this.state.data[0];
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-offset-4 col-md-6">
              <h2>{id}</h2>
            </div>
          </div>
          <GenericTable title="Games" data_arr={year.games_to_url} />
          <GenericTable title="Companies" data_arr={year.companies_to_url} />
          <h2>Most Popular Genre: {year.most_popular_genre}</h2>
        </div>
        );
    }
  }
}


