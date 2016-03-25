var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;


//How to use: https://github.com/glittershark/reactable
var data = [
    {Title: <a href="/games/1">Crash Bandicoot</a>, Genre: 'Platform', Console: 'PS1',
        Developer: <a href="/companies/1">Naughty Dog</a>, Rating:'5.0', 'Release':<a href="/years/1">1996</a>},
    {Title: <a href="/games/2">Halo: Combat Evolved</a>, Genre: 'Shooter', Console: 'Xbox',
        Developer: <a href="/companies/1">Bungie</a>, Rating:'4.5', 'Release':<a href="/years/2">2001</a>},
    {Title: <a href="/games/3">The Last of Us</a>, Genre: 'RPG', Console: 'PS3, Xbox 360',
        Developer: <a href="/companies/1">Bethesda Softworks</a>, Rating:'4.9', 'Release':<a href="/years/3">2008</a>}
];
ReactDOM.render(
    <Table id="games-table" data={data}
           sortable={true}
           defaultSort={{column: 'Title', direction: 'desc'}}
           filterable={['Title','Genre','Console','Rating']}
           filterPlaceholder='Filter by Title, Genre, Console, or Rating'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortDescending />,
    document.getElementById('table')
);
