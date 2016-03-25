
var data = [
    {Title: <a href="/games/1">Crash Bandicoot</a>, Genre: 'Platform', Console: 'PS1',
        Developer: <a href="/companies/1">Naughty Dog</a>, Rating:'5.0', 'Release':<a href="/years/1">1996</a>},
    {Title: <a href="/games/2">Halo: Combat Evolved</a>, Genre: 'Shooter', Console: 'Xbox',
        Developer: <a href="/companies/1">Bungie</a>, Rating:'4.5', 'Release':<a href="/years/2">2001</a>},
    {Title: <a href="/games/3">The Last of Us</a>, Genre: 'RPG', Console: 'PS3, Xbox 360',
        Developer: <a href="/companies/1">Bethesda Softworks</a>, Rating:'4.9', 'Release':<a href="/years/3">2008</a>}
];

var GameInformation = React.createClass({
    render: function() {
        var idStr = document.getElementById('game-id');
        console.log("Trying to get id");
        console.log(idStr.textContent.split(' ')[2]);
        var id = Number(idStr.textContent.split(' ')[2]) - 1;
        console.log(id);
        return (
            <div className="game-stats">
                <h2>Title: {data[id].Title}</h2>
                <h2>Genre: {data[id].Genre}</h2>
                <h2>Console: {data[id].Console}</h2>
                <h2>Developer: {data[id].Developer}</h2>
                <h2>Rating: {data[id].Rating}</h2>
                <h2>Release: {data[id].Release}</h2>
            </div>
        );
    }
});


ReactDOM.render(
    <GameInformation />,
    document.getElementById('game-information')
);
