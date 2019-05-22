import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import Dashboard from './pages/Dashboard'
import { theme } from './styles'

export class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Dashboard />
      </PaperProvider>
    )
  }
}

export default App
