import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import GenericTable from './generic-table.jsx'

export default class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.companyID);
    console.log(this.props);
  }
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/companies/'+this.props.params.companyID, function (result) {
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
      return (<div><h2>Loading data.... be patient</h2></div>)
    }
    else {
      let c = this.state.data[0];
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={c.image_url ? c.image_url.replace('thumb', 'cover_big') : ""} />
            </div>
            <div className="col-md-6">
              <h2>{c.name}</h2>
            </div>
          </div>
          <GenericTable title="Games" data_arr={c.games_to_url} />
          <h2>Made games in: {c.year ? <Link to={"/years/"+c.year}>{c.year}</Link> : "N/A"}</h2>
          <h2>Avg Rating: <strong>{c.avg_rating}</strong></h2>
        </div>
        );
    }
  }
}

