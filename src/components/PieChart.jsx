import React, { Component } from 'react'
import { PieChart as Pie } from 'react-native-svg-charts'

export class PieChart extends Component {
  render() {
    return <Pie style={{ height: 600 }} outerRadius={"90%"} innerRadius={"40%"} animate={true} {...this.props} />
  }
}

export default PieChart
