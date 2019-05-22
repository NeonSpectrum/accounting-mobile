import React, { Component } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { List, Card } from 'react-native-paper'
import autobind from 'autobind-decorator'
import axios from 'axios'
import numeral from 'numeral'
import Tooltip from 'rn-tooltip'
import _ from 'lodash'

import PieChart from '../components/PieChart'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import Loader from '../components/Loader'

export class Dashboard extends Component {
  state = { isLoading: true, isRefreshing: false, data: [] }
  navbar = React.createRef()

  componentDidMount() {
    this.fetchData()
  }

  @autobind
  async fetchData() {
    this.setState({ isLoading: true })

    this.filterCompany = this.navbar.current.filterCompany.current
    this.filterDate = this.navbar.current.filterDate.current
    console.log(this.filterCompany.state)

    const companies = global.companies.filter(x => this.filterCompany.state.checked.indexOf(x.name) > -1)
    const params = {}

    console.log(companies)

    if (this.filterDate.state.selected != 'all') {
      params.year = this.filterDate.state.year

      if (this.filterDate.state.month != 0) {
        params.month = this.filterDate.state.month
      }
    }

    const responses = await Promise.all(
      companies.map(company =>
        axios.get(company.url + '/api/reports', { params }).catch(() => console.log('URL error: ' + url))
      )
    )

    this.expenses = 0
    this.incomes = 0

    for (const [id, response] of responses.entries()) {
      if (response) {
        const { data } = response
        companies[id].data = data
        this.expenses += data.expense
        this.incomes += data.income
      }
    }

    this.setState({
      data: [
        { key: 1, name: 'Expenses', value: this.expenses, svg: { fill: '#f39c12' } },
        { key: 2, name: 'Income', value: this.incomes, svg: { fill: '#27ae60' } }
      ],
      total: this.expenses + this.incomes,
      isLoading: false,
      companies
    })
  }

  @autobind
  async handleRefresh() {
    this.setState({ isRefreshing: true })
    await this.fetchData()
    this.setState({ isRefreshing: false })
  }

  render() {
    const { data } = this.state

    return (
      <>
        <Navbar ref={this.navbar} fetchData={this.fetchData} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />
          }
        >
          <View style={global.styles.container}>
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <>
                <Card elevation={5}>
                  <Card.Content style={{ flexDirection: 'row' }}>
                    {this.state.total == 0 ? (
                      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 22 }}>No data to show</Text>
                      </View>
                    ) : (
                      <>
                        <PieChart style={{ flex: 0.57 }} data={data} />
                        <View style={{ flex: 0.43, justifyContent: 'center' }}>
                          {this.state.data.map((item, key) => (
                            <Tooltip
                              key={key}
                              popover={
                                <Text style={{ color: '#fff' }}>
                                  ₱ {numeral(item.value).format('0,0.00')}
                                </Text>
                              }
                            >
                              <List.Item
                                title={item.name}
                                description={numeral(item.value / this.state.total).format('0,0.00%')}
                                left={() => <List.Icon color={item.svg.fill} size={18} icon='lens' />}
                              />
                            </Tooltip>
                          ))}
                        </View>
                      </>
                    )}
                  </Card.Content>
                </Card>
                {this.state.companies.length != 0 && (
                  <Card elevation={5} style={{ marginTop: 10 }}>
                    <Card.Content>
                      <Table data={this.state.companies} />
                    </Card.Content>
                  </Card>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </>
    )
  }
}

export default Dashboard
