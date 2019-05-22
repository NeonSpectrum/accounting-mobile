import EStyleSheet from 'react-native-extended-stylesheet'
import { DefaultTheme } from 'react-native-paper'

export const styles = EStyleSheet.create({
  container: {
    padding: 10
  },
  flexCenter: {
    justifyContent: 'center',
    flex: 1
  }
})

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2980b9'
  }
}
