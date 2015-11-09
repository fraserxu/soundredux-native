import React from 'react-native'

let {
  StyleSheet,
  Navigator,
  PropTypes
} = React
import {connect} from 'react-redux/native'

import Scene from '../components/Scene'
import Search from '../components/Search'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.renderScene = this.renderScene.bind(this)
  }

  renderScene(route, navigator) {
    let Component = route.component

    return (
      <Component navigator={navigator} route={route} {...this.props} />
    )
  }

  configureScene(route) {
    if (route.name && route.name === 'Search') {
      return Navigator.SceneConfigs.FadeAndroid
    } else {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: Scene,
          name: 'Songs',
          passProps: this.props
        }}
      />
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string,
  playlists: PropTypes.object.isRequired,
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

function mapStateToProps(state) {
  const {entities, playlist, player, playlists} = state
  const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null

  return {
    player,
    playingSongId,
    playlists,
    playlist,
    songs: entities.songs,
    users: entities.users
  }
}

export default connect(mapStateToProps)(App)
