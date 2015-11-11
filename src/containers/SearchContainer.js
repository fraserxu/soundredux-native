import React from 'react-native'

let {
  View,
  Component
} = React
import {connect} from 'react-redux/native'

import Search from '../components/Search'

class SearchContainer extends Component {
  render() {
    return (
      <Search {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const { playlist, playlists, entities, player } = state
  const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null

  return {
    player,
    playingSongId,
    playlist,
    playlists,
    songs: entities.songs,
    users: entities.users
  }
}

export default connect(mapStateToProps)(SearchContainer)
