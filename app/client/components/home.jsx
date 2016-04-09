import React from 'react'
import { render } from 'react-dom'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.route.logo_url)
  }

  render() {
    let logo = this.props.route.logo_url;
      return (
        <section id="banner">
            <div className="inner">
                <div className="logo"><img src="/static/img/observatory1.png" className="img-responsive" /></div>
                <h2>Games Observatory</h2>
                <p>Defending the world from misinformation one line of code at a time</p>
                <p>We're a team of students at the University of Texas at Austin that want to make a fast and easy way for people to find out information about their favorite games. <a href="http://findgamesfor.me"></a> is a database of all the games in the world built with Flask and React.js. We're making a beautiful place to find all your favorite games.</p>
            </div>
        </section>
      );
  }
}