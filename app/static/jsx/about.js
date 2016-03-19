var SplashPage = React.createClass({
    render: function() {
        return (
          <p>
            This is a sample React class to show how to create further components.
          </p>
        );
    }
});

ReactDOM.render(
    <SplashPage />,
    document.getElementById('about')
);
