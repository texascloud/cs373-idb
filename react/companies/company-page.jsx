import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

export default class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.companyID);
    console.log(this.props);
  }
  render() {
    let id = this.props.params.companyID;
      return (
        <div className="company-stats">
          <h2>Primary key for database lookup: {id}</h2>
          <h2>Name: </h2>
          <h2>Developed: <Link to="games/">No static data</Link></h2>
          <h2>Published: <Link to="games/">No static data</Link></h2>
          <h2>Made games in: <Link to="years/">No static data</Link></h2>
          <h2>Avg Rating: </h2>
        </div>
        );
  }
}


