import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import About from './components/about.jsx'
import Companies from './components/companies.jsx'
import CompanyPage from './components/company-page.jsx'
import Games from './components/games.jsx'
import GamePage from './components/game-page.jsx'
import Years from './components/years.jsx'
import YearPage from './components/year-page.jsx'
import SearchResults from './components/search-results.jsx'
import Menu from './components/menu.jsx'
import Home from './components/home.jsx'
import NotFound from './components/not-found.jsx'



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
      <Route path="/search" component={SearchResults}/>
      <Route path="/*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('content'));
