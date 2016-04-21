import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { arrWithoutTerm, highlightTerms, sortColumn } from '../utils/helpers'


export default class Games extends React.Component {
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/games', function (result) {
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
    else {
      let games = this.state.data;
      var columns = arrWithoutTerm(games, 'game_id');
      var reformattedGames = games.map(function(obj) {
        var g = obj;
        var id = g['game_id'];
        var name = g[' Game'];
        g['name'] = g[' Game'];
        g[' Game'] = <Link to={"/games/"+id}>{name}</Link>;
        delete g.game_id;
        return g;
      });
      return (
        <Table data={reformattedGames}
               columns={columns}
               sortable={[
               {
                  column: ' Game',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children.toLowerCase();
                  var nameB = b.props.children.toLowerCase();
                  return nameA.localeCompare(nameB);
                  }
                },
                'Companies',
                'Genres',
                'Platforms',
                'Rating',
                'Year'
                ]}
               defaultSort={{column: ' Game', direction: 'asc'}}
               filterable={['name']}
               filterPlaceholder='Filter by Title, Genre, Console, or Rating'
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortDescending />
          );
    }
  }
}

export function GamesTable(data, query) {
  let games = data;
  const tmp = query.toString().split(' ').join('|');
  var terms = new RegExp(tmp, "i");
  if (data.length !== 0) {
    var columns = arrWithoutTerm(games, 'game_id');
    var reformattedGames = games.map(function(obj) {
      let g = obj;
      let id = g['game_id'];
      let year = g['Year'];
      // Save name so it's filterable
      g['name'] = g[' Game'];
      // Highlight search terms in each attribute
      // g['Companies'] = highlightTerms(g['Companies'].join(','), terms);
      // g['Genres']    = highlightTerms(g['Genres'].join(','), terms);
      // g['Platforms'] = highlightTerms(g['Platforms'].join(','), terms);
      g['Rating']    = highlightTerms(g['Rating'], terms);
      let boldedName = highlightTerms(g[' Game'], terms);
      let boldedYear = highlightTerms(g['Year'], terms);
      g[' Game'] = <Link to={"/games/"+id}>{boldedName}</Link>;
      g['Year'] = <Link to={"/years/"+year}>{boldedYear}</Link>;
      return g;
    });
  }
  return (
    <Table data={reformattedGames}
           columns={columns}
           sortable={[
                sortColumn(' Game', 2),
                'Companies',
                'Genres',
                'Platforms',
                sortColumn('Rating', 1),
                sortColumn('Year', 2)
                ]}
           defaultSort={{column: ' Game', direction: 'asc'}}
           filterPlaceholder='Filter by Title, Genre, Console, or Rating'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortDescending />
  );
}

// {
//   column: ' Game',
//     sortFunction: function(a, b) {
//   var nameA = a.props.children.toLowerCase();
//   var nameB = b.props.children.toLowerCase();
//   return nameA.localeCompare(nameB);
// }
// },
