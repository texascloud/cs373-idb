import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import About from './about/about.jsx'
import Companies from './companies/companies.jsx'
import CompanyPage from './companies/company-page.jsx'
import Games from './games/games.jsx'
import GamePage from './games/game-page.jsx'
import Years from './years/years.jsx'
import YearPage from './years/year-page.jsx'
import Menu from './menu.jsx'
import Home from './home/home.jsx'

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
