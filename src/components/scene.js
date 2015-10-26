var React = require('react-native');
var {
  StyleSheet,
  View,
  Dimensions,
} = React;
import {connect} from 'react-redux/native';

var deviceWidth = Dimensions.get('window').width;

import {changeActivePlaylist, fetchSongsIfNeeded} from '../actions/playlists';

import Header from './Header';
import Player from './Player';
// import Song from './Song';
import Songs from './Songs';
// import User from './User';

class Scene extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch } = this.props

    dispatch(changeActivePlaylist('house'));
  }

  render () {
    const {dispatch, height, navigator, player, playingSongId, playlists, songs, users} = this.props;

    return (
      <View style={styles.container}>
        <Header />
        <Songs {...this.props} />
        <Player />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
});

function mapStateToProps(state) {
  const {activePlaylist, activeSongId, activeUserId, height, navigator, player, playlists, songs, users} = state;
  const song = activeSongId && activeSongId in songs ? songs[activeSongId] : {};
  const user = activeUserId && activeUserId in users ? users[activeUserId] : {};
  const playingSong = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : {};

  return {
    activePlaylist,
    height,
    navigator,
    player,
    playingSong,
    playlists,
    song,
    user
  };
}

export default connect(mapStateToProps)(Scene)
