var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;


//How to use: https://github.com/glittershark/reactable
var data = [
    {Title: <a href="/games/1">Crash Bandicoot</a>, Genre: 'Platform', Console: 'PS1', Developer:'Naughty Dog', Rating:'5.0', 'Release':<a href="/years/1996">1996</a>},
    {Title: <a href="/games/2">Jak and Daxter</a>, Genre: 'Platform', Console: 'PS2', Developer:'Naughty Dog', Rating:'4.2', 'Release':<a href="/years/2001">2001</a>},
    {Title: <a href="/games/3">The Last of Us</a>, Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3', Developer:'Naughty Dog', Rating:'4.9', 'Release':<a href="/years/2003">2003</a>}
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
