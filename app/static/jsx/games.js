var SplashPage = React.createClass({
    render: function() {
        return (
          <p>
              Insert React components here!
          </p>
        );
    }
});

//How to use: https://github.com/glittershark/reactable
var Table = Reactable.Table;
var data = [
    {Title: 'Crash Bandicoot', Genre: 'Platform', Console: 'Playstation', Developer:'Naughty Dog', Rating:'5.0', 'Release Date':'1996'},
    {Title: 'Jak and Daxter', Genre: 'Platform', Console: 'Playstation 2', Developer:'Naughty Dog', Rating:'4.2', 'Release Date':'2001'},
    {Title: 'The Last of Us', Genre: 'Action-Adventure, Survival-Horror', Console: 'Playstation 3', Developer:'Naughty Dog', Rating:'4.9', 'Release Date':'2013'}
];
ReactDOM.render(
        <Table className="container" id="games" data={data}
               sortable={true}
               defaultSort={{column: 'Title', direction: 'desc'}}
               defaultSortDescending />,
        document.getElementById('table')
);
