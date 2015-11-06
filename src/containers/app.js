import React from 'react-native'

let {
  StyleSheet,
  Navigator
} = React;

import Scene from '../components/Scene'
import Search from '../components/Search'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.renderScene = this.renderScene.bind(this)
    this.configureScene = this.configureScene.bind(this)
  }

  renderScene(route, navigator) {
    let Component = route.component

    return (
      <Component navigator={navigator} route={route} {...route.passProps} />
    )
  }

  configureScene(route) {
    return Navigator.SceneConfigs.FloatFromBottomAndroid
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: Scene
        }}
      />

    )
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

export default App
