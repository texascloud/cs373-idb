import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table } from 'reactable'

const company_data = [
  {Name: <Link to="/companies/1">Naughty Dog </Link>, Developed: 60, Published: 581,
    Founded:'1994', 'Avg Rating':82*0.05},
  {Name: <Link to="/companies/2">Bungie </Link>, Developed: 8, Published: 363,
    Founded:'1989', 'Avg Rating':77*0.05},
  {Name: <Link to="/companies/3">Bethesda Softworks</Link>, Developed: 17, Published: 1,
    Founded:'2003', 'Avg Rating':81*0.05}
];

export default class Companies extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/companies', function (result) {
      this.setState({
        data: result
      });
    }.bind(this));
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    if (this.state.data === null) {
      return (<div><h1>Waiting to load data...</h1></div>)
    }
    else {
      var companies = this.state.data;
      var reformattedCompanies = companies.map(function(obj) {
        var comp = obj;
        var id = comp['company_id'];
        var name = comp['name'];
        comp['name'] = <Link to={"/companies/"+id}>{name}</Link>;
        //comp[name] = '<Link to="/companies/"comp.company_id>comp.name</Link>';
        delete comp.company_id;
        return comp;
      });
      return (
        <Table data={reformattedCompanies}
               sortable={[
               {
                  column: 'name',
                  sortFunction: function(a, b) {
                  var nameA = a.props.children.toLowerCase();
                  var nameB = b.props.children.toLowerCase();

                  return nameA.localeCompare(nameB);
                  }
                },
                'avg_rating',
                'num_published',
                'year_founded',
                'num_developed'
                ]}
               defaultSort={{column: 'name', direction: 'desc'}}
               itemsPerPage={6} pageButtonLimit={10}
               defaultSortDescending/>
        );
    }
  }
}


