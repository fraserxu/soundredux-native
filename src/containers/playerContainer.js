import React from 'react-native'

let {
  StyleSheet,
  Navigator,
  PropTypes,
  View
} = React
import {connect} from 'react-redux/native'

import Player from '../components/Player'

class PlayerContainer extends React.Component {
  render() {
    const { playingSongId } = this.props

    if (playingSongId === null) {
      return <View />
    }

    return (
      <Player {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const { entities, player } = state
  const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null

  return {
    player,
    playingSongId,
    songs: entities.songs,
    users: entities.users
  }
}

export default connect(mapStateToProps)(PlayerContainer)
