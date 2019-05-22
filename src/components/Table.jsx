import React, { Component } from 'react'
import { Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import numeral from 'numeral'

export class Table extends Component {
  render() {
    const { data } = this.props
    let totalExpenses = 0
    let totalIncome = 0

    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Company Name</DataTable.Title>
          <DataTable.Title numeric>Income</DataTable.Title>
          <DataTable.Title numeric>Expenses</DataTable.Title>
        </DataTable.Header>

        {data.map((item, key) => {
          totalExpenses += item.data.expense
          totalIncome += item.data.income

          return (
            <DataTable.Row key={key}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>₱ {numeral(item.data.income).format('0,0.00')}</DataTable.Cell>
              <DataTable.Cell numeric>₱ {numeral(item.data.expense).format('0,0.00')}</DataTable.Cell>
            </DataTable.Row>
          )
        })}

        <DataTable.Header>
          <DataTable.Cell />
          <DataTable.Cell numeric>Total</DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={{ color: totalIncome - totalExpenses >= 0 ? 'green' : 'red' }}>
              ₱ {numeral(totalIncome - totalExpenses).format('0,0.00')}
            </Text>
          </DataTable.Cell>
        </DataTable.Header>
      </DataTable>
    )
  }
}

export default Table
