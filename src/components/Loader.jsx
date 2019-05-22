import React, { Component } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet'

export class Loader extends Component {
  render() {
    return (
      <View style={[global.styles.container, global.styles.flexCenter]}>
        <ActivityIndicator animating={true} color={EStyleSheet.value('$primary')} size='large' />
      </View>
    )
  }
}

export default Loader
