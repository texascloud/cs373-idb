//How to use: https://github.com/glittershark/reactable
var Table = Reactable.Table;
var data = [
    {Title: 'Crash Bandicoot', Genre: 'Platform', Console: 'PS1', Developer:'Naughty Dog', Rating:'5.0', 'Release':'1996'},
    {Title: 'Jak and Daxter', Genre: 'Platform', Console: 'PS2', Developer:'Naughty Dog', Rating:'4.2', 'Release':'2001'},
    {Title: 'The Last of Us', Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3', Developer:'Naughty Dog', Rating:'4.9', 'Release':'2013'},
    {Title: 'Crash Bandicoot', Genre: 'Platform', Console: 'PS1', Developer:'Naughty Dog', Rating:'5.0', 'Release':'1996'},
    {Title: 'Jak and Daxter', Genre: 'Platform', Console: 'PS2', Developer:'Naughty Dog', Rating:'4.2', 'Release':'2001'},
    {Title: 'The Last of Us', Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3', Developer:'Naughty Dog', Rating:'4.9', 'Release':'2013'},
    {Title: 'Crash Bandicoot', Genre: 'Platform', Console: 'PS1', Developer:'Naughty Dog', Rating:'5.0', 'Release':'1996'},
    {Title: 'Jak and Daxter', Genre: 'Platform', Console: 'PS2', Developer:'Naughty Dog', Rating:'4.2', 'Release':'2001'},
    {Title: 'The Last of Us', Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3', Developer:'Naughty Dog', Rating:'4.9', 'Release':'2013'},
    {Title: 'Crash Bandicoot', Genre: 'Platform', Console: 'PS1', Developer:'Naughty Dog', Rating:'5.0', 'Release':'1996'},
    {Title: 'Jak and Daxter', Genre: 'Platform', Console: 'PS2', Developer:'Naughty Dog', Rating:'4.2', 'Release':'2001'},
    {Title: 'The Last of Us', Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3', Developer:'Naughty Dog', Rating:'4.9', 'Release':'2013'},
    {Title: 'Crash Bandicoot', Genre: 'Platform', Console: 'PS1', Developer:'Naughty Dog', Rating:'5.0', 'Release':'1996'},
    {Title: 'Jak and Daxter', Genre: 'Platform', Console: 'PS2', Developer:'Naughty Dog', Rating:'4.2', 'Release':'2001'},
    {Title: 'The Last of Us', Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3', Developer:'Naughty Dog', Rating:'4.9', 'Release':'2013'}
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
