var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ListView,
  TouchableOpacity
} = React;

var ProgressBar = require('ProgressBarAndroid');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import Toolbar from './Toolbar'
import {playSong} from '../actions/player';
import {fetchSongsIfNeeded} from '../actions/playlists';
import Song from './Song'

class Songs extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetchingTail: false
    }

    this.onEndReached = this.onEndReached.bind(this);
  }

  componentWillMount() {
    const {dispatch, playlist} = this.props;
    dispatch(fetchSongsIfNeeded(playlist));
  }

  componentWillReceiveProps(nextProps) {
      const {dispatch, playlist, playlists} = this.props;
      if (playlist !== nextProps.playlist) {
          if (!(nextProps.playlist in playlists) || playlists[nextProps.playlist].items.length === 0) {
              dispatch(fetchSongsIfNeeded(nextProps.playlist));
          }
      }
  }

  renderSong (song) {
    return (
      <Image
        key={song['artwork_url']}
        style={styles.avatar}
        source={{uri: song['artwork_url']}}
      />
    )
  }

  playSong(i, song, user) {
    const {playlist, dispatch, navigator} = this.props;

    navigator.push({
      component: Song,
      name: 'Song Detail',
      passProps: {
        song: song,
        user: user
      }
    })

    dispatch(playSong(playlist, i));
  }

  onEndReached() {
    this.props.dispatch(this.props.scrollFunc())
  }

  render () {
    const {dispatch, playlist, playlists, playingSongId, sticky, time, songs, users} = this.props;
    const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;

    // const songs = playlists[activePlaylist]
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dataSource = playlist in playlists ? ds.cloneWithRows(playlists[playlist].items) : ds.cloneWithRows([]);

    return (
      <View style={[styles.container, {
        height: playingSongId ? deviceHeight - 145 : deviceHeight - 70,
      }]}>
        <Toolbar dispatch={dispatch} playlist={playlist} />
        { isFetching &&
          <View style={styles.progressbar}>
            <ProgressBar styleAttr="Small" />
          </View>
        }
        <ListView
          dataSource={dataSource}
          onEndReached={this.onEndReached}
          renderRow={(song, sectionId, rowId) => {
            return (
              <TouchableOpacity onPress={this.playSong.bind(this, rowId, songs[song], users[songs[song].user_id])}>
                <View style={styles.card}>
                  <View>
                    <Image
                      key={songs[song]['artwork_url']}
                      style={styles.avatar}
                      source={{uri: songs[song]['artwork_url']}}
                    />
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.username}>{users[songs[song].user_id].username}</Text>
                    <Text style={styles.title}>{songs[song].title}</Text>
                    <Text style={styles.count}>Played: {songs[song].playback_count}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    backgroundColor: '#f4f4f4'
  },
  progressbar: {
    marginTop: 10,
    alignItems: 'center'
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  avatar: {
    padding: 10,
    width: 50,
    height: 50
  },
  description: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column'
  },
  username: {
    fontSize: 10
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#000',
    fontSize: 12
  },
  count: {
    fontSize: 10
  }
});

export default Songs
