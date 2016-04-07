import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

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
        <div className="company-stats">
          <h2>Name: {c.name}</h2>
          <h2>Developed: <Link to="games/">{c.num_developed}</Link></h2>
          <h2>Published: <Link to="games/">{c.num_published}</Link></h2>
          <h2>Made games in: <Link to={"years/"+c.year}>{c.year}</Link></h2>
          <h2>Avg Rating: {c.avg_rating}</h2>
        </div>
        );
    }
  }
}


