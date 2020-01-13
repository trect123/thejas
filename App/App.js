import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Containers/Root/RootScreen'

const { store, persistor } = createStore()
// export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre/"
export default class App extends Component {
  render() {
    console.log("first render")
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    )
  }
}
