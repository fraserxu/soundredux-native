var React = require('react-native');
var {
  StyleSheet,
  View,
  Dimensions,
  PropTypes
} = React;
import {connect} from 'react-redux/native';

var deviceWidth = Dimensions.get('window').width;

import {fetchSongsIfNeeded} from '../actions/playlists';
import {parseUrl} from '../utils/RouteUtils';

import Header from './Header';
import Player from './Player';
// import Song from './Song';
import Songs from './Songs';
// import User from './User';

class Scene extends React.Component {
  constructor (props) {
    super(props)
  }

  renderContent () {
    const {dispatch, height, navigator, player, playingSongId, playlists, songs, users} = this.props;
    let playlist = 'house';

    return (
        <Songs
            {...this.props}
            playlist={playlist}
            scrollFunc={fetchSongsIfNeeded.bind(null, playlist)} />
    );
  }

  renderPlayer () {
    const {dispatch, player, playingSongId, playlists, songs, users} = this.props;
    if (playingSongId === null) {
        return;
    }

    return (
        <Player
            dispatch={dispatch}
            player={player}
            playingSongId={playingSongId}
            playlists={playlists}
            songs={songs}
            users={users} />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Header />
        {this.renderContent()}
        {this.renderPlayer()}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

Scene.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    playingSongId: PropTypes.number,
    playlists: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const {entities, height, navigator, player, playlists} = state;

    console.log('state', state)

    if (player.currentSongIndex !== null) {
      console.log('playlist', playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items)
      console.log('songid', playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex])
    }

    const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null;

    return {
        height,
        navigator,
        player,
        playingSongId,
        playlists,
        songs: entities.songs,
        users: entities.users
    };
}

export default connect(mapStateToProps)(Scene)
