var Table = Reactable.Table;
var Column = Reactable.Td;
var data = [
    {Name: <a href="/companies/1"> Naughty Dog </a>, Developed: 60, Published: 581, Founded:'1996', 'Avg Rating':82*0.05},
    {Name: <a href="/companies/2"> THQ </a>, Developed: 8, Published: 363, Founded:'1989', 'Avg Rating':77*0.05},
    {Name: <a href="/companies/3"> Obsidian Entertainment </a>, Developed: 17, Published: 1, Founded:'2003', 'Avg Rating':81*0.05}
];


ReactDOM.render(
        <Table id="companies-table" data={data}
               sortable={true}
               defaultSort={{column: 'Name', direction: 'desc'}}
               filterable={['Name','Avg Rating']}
               filterPlaceholder='Filter by Name or Avg Rating...'
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortDescending/>,
        document.getElementById('table')
);
