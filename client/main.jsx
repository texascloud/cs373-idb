import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import About from './components/about.jsx'
import Companies from './components/companies.jsx'
import CompanyPage from './components/company-page.jsx'
import Games from './components/games.jsx'
import GamePage from './components/game-page.jsx'
import Years from './components/years.jsx'
import YearPage from './components/year-page.jsx'
import Menu from './components/menu.jsx'
import Home from './components/home.jsx'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component {
  render() {
      return (
          <div>
            <Menu />
            {this.props.children}
          </div>
      )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/companies" component={Companies}/>
        <Route path="/companies/:companyID" component={CompanyPage}/>
      <Route path="/games" component={Games}/>
        <Route path="/games/:gameID" component={GamePage}/>
      <Route path="/years" component={Years}/>
        <Route path="/years/:yearID" component={YearPage}/>
    </Route>
  </Router>
), document.getElementById('content'));
