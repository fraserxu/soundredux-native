import React from 'react-native'
import { Provider } from 'react-redux/native'
import configureStore from '../store/configure-store'
import Scene from '../components/scene'

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <Scene />}
      </Provider>
    )
  }
}

export default Root
