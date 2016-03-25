var company_data = [
    {Name: <a href="/companies/1"> Naughty Dog </a>, Developed: 60, Published: 581,
        Founded:'1994', 'Avg Rating':82*0.05},
    {Name: <a href="/companies/2"> Bungie </a>, Developed: 8, Published: 363,
        Founded:'1989', 'Avg Rating':77*0.05},
    {Name: <a href="/companies/3"> Bethesda Softworks</a>, Developed: 17, Published: 1,
        Founded:'2003', 'Avg Rating':81*0.05}
];

var game_data = [
    {Title: <a href="/games/1">Crash Bandicoot</a>, Genre: 'Platform', Console: 'PS1',
        Developer: <a href="/companies/1">Naughty Dog</a>, Rating:'5.0', 'Release':<a href="/years/1">1996</a>},
    {Title: <a href="/games/2">Halo: Combat Evolved</a>, Genre: 'Shooter', Console: 'Xbox',
        Developer: <a href="/companies/1">Bungie</a>, Rating:'4.5', 'Release':<a href="/years/2">2001</a>},
    {Title: <a href="/games/3">The Last of Us</a>, Genre: 'RPG', Console: 'PS3, Xbox 360',
        Developer: <a href="/companies/1">Bethesda Softworks</a>, Rating:'4.9', 'Release':<a href="/years/3">2008</a>}
];

var year_data = [
    {Year_id: 1, Year: <a href="/years/1">1996</a>, 'Number of Games': '1','Most Popular Genre': 'Platform', 'Average Rating':'5.0', 'Number of Companies Founded': '1'},
    {Year_id: 2, Year: <a href="/years/2">2001</a>, 'Number of Games': '1', 'Most Popular Genre': 'Platform', 'Average Rating':'4.2', 'Number of Companies Founded' : '1'},
    {Year_id: 3, Year: <a href="/years/3">2008</a>, 'Number of Games': '1', 'Most Popular Genre': 'Action-Adventure', 'Average Rating':'4.9', 'Number of Companies Founded' : '0'}
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

