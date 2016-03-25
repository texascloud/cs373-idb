var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;


//How to use: https://github.com/glittershark/reactable
var data = [
    {Year: <a href="/years/1">1996</a>, 'Number of Games': '1','Most Popular Genre': 'Platform', 'Average Rating':'5.0', 'Who Made Games': '1'},
    {Year: <a href="/years/2">2001</a>, 'Number of Games': '1', 'Most Popular Genre': 'Shooter', 'Average Rating':'4.2', 'Who Made Games' : '1'},
    {Year: <a href="/years/3">2008</a>, 'Number of Games': '1', 'Most Popular Genre': 'RPG', 'Average Rating':'4.9', 'Who Made Games' : '1'}
];
ReactDOM.render(
    <Table id="years-table" data={data}
           sortable={true}
           defaultSort={{column: 'Years', direction: 'desc'}}
           filterable={['Year','Number of Games','Most Popular Genre','Average Rating', 'Who Made Games']}
           filterPlaceholder='Filter by Years, Number of Games, Most Popular Genre, Average Rating, or Who Made Games'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortDescending />,
    document.getElementById('table')
);
