import React from 'react'
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
        <div className="year-stats">
          <h2>Year: {id}</h2>
          <h2>Number of Games: <Link to="/games/">{year.num_games}</Link></h2>
          <h2>Most Popular Genre: {year.most_popular_genre}</h2>
          <h2>Companies founded: <Link to="/companies/">{Object.keys(year.companies_to_url).length}</Link></h2>
        </div>
        );
    }
  }
}


