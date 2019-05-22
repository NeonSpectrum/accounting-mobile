import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Dialog, Portal, Switch, Button, List } from 'react-native-paper'
import autobind from 'autobind-decorator'

export class FilterCompany extends Component {
  state = {
    companies: global.companies.map(x => x.name),
    checked: global.companies.map(x => x.name),
    visible: false
  }

  @autobind
  show() {
    this.setState({ visible: true, tempChecked: this.state.checked })
  }

  @autobind
  hide() {
    this.setState({ visible: false })
  }

  render() {
    const { tempChecked } = this.state

    return (
      <Portal>
        <Dialog visible={this.state.visible} onDismiss={this.hide}>
          <Dialog.Title>Filter by Company</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ marginHorizontal: 30, marginVertical: 15 }}>
              <View>
                {this.state.companies.map((company, key) => (
                  <List.Item
                    key={key}
                    title={company}
                    right={() => (
                      <Switch
                        value={tempChecked.indexOf(company) > -1}
                        onValueChange={() =>
                          this.setState({
                            tempChecked:
                              tempChecked.indexOf(company) == -1
                                ? tempChecked.concat(company)
                                : tempChecked.filter(x => x != company)
                          })
                        }
                      />
                    )}
                  />
                ))}
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button
              onPress={() => {
                this.setState({ checked: tempChecked }, () => {
                  this.hide()
                  this.props.onApply()
                })
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

export default FilterCompany
