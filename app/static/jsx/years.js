var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;


//How to use: https://github.com/glittershark/reactable
var data = [
    {Year: <a href="/years/1">1996</a>, 'Number of Games': '1','Most Popular Genre': 'Platform', 'Average Rating':'5.0', 'Number of Companies Founded': '1'},
    {Year: <a href="/years/2">2001</a>, 'Number of Games': '1', 'Most Popular Genre': 'Platform', 'Average Rating':'4.2', 'Number of Companies Founded' : '1'},
    {Year: <a href="/years/3">2003</a>, 'Number of Games': '1', 'Most Popular Genre': 'Action-Adventure', 'Average Rating':'4.9', 'Number of Companies Founded' : '0'}
];
ReactDOM.render(
    <Table id="years-table" data={data}
           sortable={true}
           defaultSort={{column: 'Years', direction: 'desc'}}
           filterable={['Year','Number of Games','Most Popular Genre','Average Rating', 'Number of Companies Founded']}
           filterPlaceholder='Filter by Years, Number of Games, Most Popular Genre, Average Rating, or Number of Companies Founded'
           itemsPerPage={6} pageButtonLimit={10}
           defaultSortDescending />,
    document.getElementById('table')
);
