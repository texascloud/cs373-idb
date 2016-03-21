var Table = Reactable.Table;
var data = [
    {Name: 'Nintendo', Developed: 60, Published: 581, Founded:'1974-Dec-31', 'Avg Rating':82*0.05},
    {Name: 'THQ', Developed: 8, Published: 363, Founded:'1989-Jan-01', 'Avg Rating':77*0.05},
    {Name: 'Obsidian Entertainment', Developed: 17, Published: 1, Founded:'2003-01-01', 'Avg Rating':81*0.05},
    {Name: 'Nintendo', Developed: 60, Published: 581, Founded:'1974-Dec-31', 'Avg Rating':82*0.05},
    {Name: 'THQ', Developed: 8, Published: 363, Founded:'1989-Jan-01', 'Avg Rating':77*0.05},
    {Name: 'Obsidian Entertainment', Developed: 17, Published: 1, Founded:'2003-01-01', 'Avg Rating':81*0.05},
    {Name: 'Nintendo', Developed: 60, Published: 581, Founded:'1974-Dec-31', 'Avg Rating':82*0.05},
    {Name: 'THQ', Developed: 8, Published: 363, Founded:'1989-Jan-01', 'Avg Rating':77*0.05},
    {Name: 'Obsidian Entertainment', Developed: 17, Published: 1, Founded:'2003-01-01', 'Avg Rating':81*0.05},
    {Name: 'Nintendo', Developed: 60, Published: 581, Founded:'1974-Dec-31', 'Avg Rating':82*0.05},
    {Name: 'THQ', Developed: 8, Published: 363, Founded:'1989-Jan-01', 'Avg Rating':77*0.05},
    {Name: 'Obsidian Entertainment', Developed: 17, Published: 1, Founded:'2003-01-01', 'Avg Rating':81*0.05},
    {Name: 'Nintendo', Developed: 60, Published: 581, Founded:'1974-Dec-31', 'Avg Rating':82*0.05},
    {Name: 'THQ', Developed: 8, Published: 363, Founded:'1989-Jan-01', 'Avg Rating':77*0.05},
    {Name: 'Obsidian Entertainment', Developed: 17, Published: 1, Founded:'2003-01-01', 'Avg Rating':81*0.05}
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
