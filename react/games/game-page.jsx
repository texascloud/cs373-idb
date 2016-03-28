import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.gameID);
    console.log(this.props);
  }
  render() {
    let id = this.props.params.gameID;
      return (
        <div className="game-stats">
          <h2>Primary key for database lookup: {id}</h2>
          <h2>Title: </h2>
          <h2>Genre: </h2>
          <h2>Console: </h2>
          <h2>Developer: <Link to="companies/">No static data</Link></h2>
          <h2>Rating:</h2>
          <h2>Release: <Link to="years/">No static data</Link></h2>
        </div>
        );
  }
}


