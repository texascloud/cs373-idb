import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'
import { arrWithoutTerm } from '../utils/helpers'


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

export function GamesTable(data) {
  let games = data;
  var columns = arrWithoutTerm(games, 'game_id');
  var reformattedGames = games.map(function(obj) {
    var g = obj;
    var id = g['game_id'];
    var name = g[' Game'];
    g['name'] = g[' Game'];
    g[' Game'] = <Link to={"/games/"+id}>{name}</Link>;
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
           filterPlaceholder='Filter by Title, Genre, Console, or Rating'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortDescending />
  );
}


// const mapStateToProps = (state) => {
//   return {
//     game_data: state.nah
//   }
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getGames: () => {
//       dispatch(requestGames())
//     }
//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Games)

