import React, { Component } from 'react'
import { View } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'

import FilterDate from '../components/FilterDate'
import FilterCompany from '../components/FilterCompany'

export class Navbar extends Component {
  state = { menu: null }
  filterDate = React.createRef()
  filterCompany = React.createRef()

  toggleMenu(id) {
    this.setState({
      menu: id
    })
  }

  showDialog(id) {
    this.toggleMenu(null)
    this[id].current.show()
  }

  render() {
    return (
      <>
        <Appbar.Header statusBarHeight={0} style={{ zIndex: 1 }}>
          <Appbar.Content title='Dashboard' />
          <Menu
            visible={this.state.menu == 'filter'}
            onDismiss={() => this.toggleMenu(null)}
            anchor={
              <Appbar.Action icon='filter-list' color='#fff' onPress={() => this.toggleMenu('filter')} />
            }
          >
            <Menu.Item onPress={() => this.showDialog('filterDate')} title='By Date' />
            <Menu.Item onPress={() => this.showDialog('filterCompany')} title='By Company' />
          </Menu>
        </Appbar.Header>
        <FilterDate ref={this.filterDate} onApply={this.props.fetchData} />
        <FilterCompany ref={this.filterCompany} onApply={this.props.fetchData} />
      </>
    )
  }
}

export default Navbar
