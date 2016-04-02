import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

const game_data = [
  {Title: <Link to="/games/1">Crash Bandicoot</Link>, Genre: 'Platform', Console: 'PS1',
    Developer: <Link to="/companies/1">Naughty Dog</Link>, Rating:'5.0', 'Release':<Link to="/years/1996">1996</Link>},
  {Title: <Link to="/games/2">Halo: Combat Evolved</Link>, Genre: 'Shooter', Console: 'Xbox',
    Developer: <Link to="/companies/2">Bungie</Link>, Rating:'4.5', 'Release':<Link to="/years/2001">2001</Link>},
  {Title: <Link to="/games/3">The Last of Us</Link>, Genre: 'RPG', Console: 'PS3, Xbox 360',
    Developer: <Link to="/companies/3">Bethesda Softworks</Link>, Rating:'4.9', 'Release':<Link to="/years/2008">2008</Link>}
];


export default class Games extends React.Component {
  render() {
    return (
      <Table data={game_data}
             sortable={true}
             defaultSort={{column: 'Title', direction: 'desc'}}
             filterable={['Genre','Console','Rating']}
             filterPlaceholder='Filter by Title, Genre, Console, or Rating'
             itemsPerPage={6} pageButtonLimit={10}
             defaultSortDescending />
        );
  }
}

