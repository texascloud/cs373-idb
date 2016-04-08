import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table, Thead, Th, Tr, Td } from 'reactable'

export default class GenericTable extends React.Component {
  constructor() {
    super();
  }
  render() {
    if (this.props.data_arr.length !== 0) {
      let data = this.props.data_arr;
      var prettyData = data.map(function(obj) {
        var e = obj;
        var name = e['name'];
        e['name'] = <Link to={e.url}>{name}</Link>;
        return e;
      });
      return (
        <div>
          <h2>{this.props.title}</h2>
          <Table data={prettyData}>
            <Thead>
              <Th column="name">
                <strong></strong>
              </Th>
            </Thead>
          </Table>
        </div>
      )
      }
    else {
      return (
        <h2>{this.props.title}: N/A</h2>
      );
    }
  }
}
