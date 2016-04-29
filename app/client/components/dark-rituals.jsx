import React from 'react'
import { render } from 'react-dom'
import { Table } from 'reactable'
import { Chart, ChartPie, Bar, BarGroup, Scatter, Pie} from 'react-d3-shape'
import {Xgrid, Xaxis, Ygrid, Yaxis } from 'react-d3-core'


export default class DarkRituals extends React.Component {
  componentWillMount() {
    this.setState({data: []});
    for (let i = 1; i < 40; i++) {
      this.serverRequest = $.get('http://www.darkritual.cards/api/cards/'+i, function (result) {
        this.setState({
          data: this.state.data.concat(result)
        });
      }.bind(this));
    }
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    if (this.state.data === []) {
      return (<div><p>Retrieving card information...</p></div>)
    }
    else {
      var cards = this.state.data;
      var chartSeries = [
        {
        field: 'cmc',
        name:  'Card Cost',
        color: '#ff7f0e',
        style: {
          "fillOpacity": .1
        }
        }
      ];
      var x = function(e) {
        let c = e.colors;
        c = c.replace('black', 'B');
        c = c.replace('blue',  'U');
        c = c.replace('green', 'G');
        c = c.replace('red',   'R');
        c = c.replace('white', 'W');
        c = c.replace(/'/g, '');
        c = c.replace(/,/g, '');
        c = c.replace('[', '');
        c = c.replace(']', '');
        return c;
      };
      return (
        <Chart
          width= {1920}
          height= {900}
          data= {cards}
          chartSeries= {chartSeries}
          x= {x}
          xScale= "ordinal"
          xLabel='Colors'
          yLabel='Card Cost'
        >
          <BarGroup
            chartSeries= {chartSeries}
          />
          <Xaxis/>
          <Yaxis/>
        </Chart>
        );
    }
  }
}
