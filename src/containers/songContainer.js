import React from 'react-native'

let {
  View,
  Component
} = React
import {connect} from 'react-redux/native'

import Song from '../components/Song'

class SongContainer extends Component {
  render() {
    return (
      <Song {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const { entities, player, playlists } = state
  const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null

  return {
    player,
    playingSongId,
    songs: entities.songs,
    users: entities.users
  }
}

export default connect(mapStateToProps)(SongContainer)
