var company_data = [
    {Name: 'Naughty Dog', Developed: 60, Published: 581, Founded:'1974', 'Avg Rating':82*0.05},
    {Name: 'THQ', Developed: 8, Published: 363, Founded:'1989', 'Avg Rating':77*0.05},
    {Name: 'Obsidian Entertainment', Developed: 17, Published: 1, Founded:'2003', 'Avg Rating':81*0.05}
];

var game_data = [
    {Title: <a href="/games/1">Crash Bandicoot</a>, Genre: 'Platform', Console: 'PS1',
        Developer: <a href="/companies/1">Naughty Dog</a>, Rating:'5.0', 'Release':<a href="/years/1996">1996</a>},
    {Title: <a href="/games/2">Jak and Daxter</a>, Genre: 'Platform', Console: 'PS2',
        Developer: <a href="/companies/1">Naughty Dog</a>, Rating:'4.2', 'Release':<a href="/years/2001">2001</a>},
    {Title: <a href="/games/3">The Last of Us</a>, Genre: 'Action-Adventure, Survival-Horror', Console: 'PS3',
        Developer: <a href="/companies/1">Naughty Dog</a>, Rating:'4.9', 'Release':<a href="/years/2003">2003</a>}
];

var year_data = [
    {Year_id: 1, Year: <a href="/years/1">1996</a>, 'Number of Games': '1','Most Popular Genre': 'Platform', 'Average Rating':'5.0', 'Number of Companies Founded': '1'},
    {Year_id: 2, Year: <a href="/years/2">2001</a>, 'Number of Games': '1', 'Most Popular Genre': 'Platform', 'Average Rating':'4.2', 'Number of Companies Founded' : '1'},
    {Year_id: 3, Year: <a href="/years/3">2003</a>, 'Number of Games': '1', 'Most Popular Genre': 'Action-Adventure', 'Average Rating':'4.9', 'Number of Companies Founded' : '0'}
];

var YearInformation = React.createClass({
    render: function() {
        var idStr = document.getElementById('year-id');
        console.log("Trying to get id");
        console.log(idStr.textContent.split(' ')[2]);
        var id = Number(idStr.textContent.split(' ')[2]);
        console.log(id);
        return (
            <div className="year-stats">
                <h2>Year: {year_data[id-1].Year}</h2>
                <h2>Number of Games: <a href={"/games/"+id.toString()}>{year_data[id]["Number of Games"]}</a></h2>
                <h2>Most Popular Genre: {year_data[id]["Most Popular Genre"]}</h2>
                <h2>Companies who made games: <a href={"/companies/"+id.toString()} >{company_data[id].Name}</a></h2>
            </div>
        );
    }
});


ReactDOM.render(
    <YearInformation />,
    document.getElementById('year-information')
);

