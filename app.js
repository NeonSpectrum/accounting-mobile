import { registerRootComponent } from 'expo'
import EStyleSheet from 'react-native-extended-stylesheet'

import App from './src/App'
import { styles } from './src/styles'

EStyleSheet.build({
  $primary: '#2980b9'
})

global.companies = [
  { name: 'Accounting 1', url: 'http://9c62e29b.ngrok.io' },
  { name: 'Accounting 2', url: 'http://9c62e29b.ngrok.io' }
]
global.styles = styles

registerRootComponent(App)
