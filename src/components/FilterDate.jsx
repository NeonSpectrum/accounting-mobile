import React, { Component } from 'react'
import { View, Text, ScrollView, Picker } from 'react-native'
import { Dialog, RadioButton, Portal, Button, List } from 'react-native-paper'
import autobind from 'autobind-decorator'
import _ from 'lodash'
import moment from 'moment'

export class FilterDate extends Component {
  state = {
    visible: false,
    selected: 'all',
    month: 0,
    year: +moment().format('YYYY')
  }

  @autobind
  show() {
    this.setState({
      visible: true,
      tempSelected: this.state.selected,
      tempMonth: this.state.month,
      tempYear: this.state.year
    })
  }

  @autobind
  hide() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <Portal>
        <Dialog visible={this.state.visible} onDismiss={this.hide}>
          <Dialog.Title>By Date</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ marginHorizontal: 15, marginVertical: 15 }}>
              <View>
                <RadioButton.Group
                  onValueChange={tempSelected => this.setState({ tempSelected })}
                  value={this.state.tempSelected}
                >
                  <List.Item title='All' left={() => <RadioButton value='all' />} />
                  <List.Item title='Custom' left={() => <RadioButton value='custom' />} />
                </RadioButton.Group>
                {this.state.tempSelected == 'custom' && (
                  <View
                    style={{
                      marginLeft: 45,
                      marginRight: 30,
                      flexDirection: 'row'
                    }}
                  >
                    <Picker
                      selectedValue={this.state.tempYear}
                      style={{ height: 50, flex: 0.5 }}
                      onValueChange={tempYear => this.setState({ tempYear })}
                    >
                      {_.range(
                        2015,
                        moment()
                          .add(1, 'years')
                          .format('YYYY')
                      ).map((year, key) => (
                        <Picker.Item key={key} label={year.toString()} value={year} />
                      ))}
                    </Picker>
                    <Picker
                      selectedValue={this.state.tempMonth}
                      style={{ height: 50, flex: 0.5 }}
                      onValueChange={tempMonth => this.setState({ tempMonth })}
                    >
                      <Picker.Item label='None' value={0} />
                      {_.range(0, 12).map((month, key) => (
                        <Picker.Item key={key} label={moment({ month }).format('MMMM')} value={month + 1} />
                      ))}
                    </Picker>
                  </View>
                )}
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button
              onPress={() => {
                this.setState(
                  {
                    selected: this.state.tempSelected,
                    month: this.state.tempMonth,
                    year: this.state.tempYear
                  },
                  () => {
                    this.hide()
                    this.props.onApply()
                  }
                )
              }}
            >
              Apply
            </Button>
            <Button onPress={this.hide}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default FilterDate
