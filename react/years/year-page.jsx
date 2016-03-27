import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

export default class YearPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.yearID);
    console.log(this.props);
  }
  render() {
    let id = this.props.params.yearID;
      return (
        <div className="year-stats">
          <h2>Primary key for database lookup: {id}</h2>
          <h2>Year: {id}</h2>
          <h2>Number of Games: <Link to="/games/">No static data</Link></h2>
          <h2>Most Popular Genre: </h2>
          <h2>Companies who made games: <Link to="/companies/">No static data</Link></h2>
        </div>
        );
  }
}


