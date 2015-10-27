var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ListView,
  TouchableHighlight
} = React;

var ProgressBar = require('ProgressBarAndroid');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import {playSong} from '../actions/player';
import {fetchSongsIfNeeded} from '../actions/playlists';

class Songs extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount() {
      const {dispatch, playlist} = this.props;
      dispatch(fetchSongsIfNeeded(playlist));
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

  playSong(i) {
      const {playlist, dispatch} = this.props;
      dispatch(playSong(playlist, i));
  }

  render () {
    const {dispatch, playlist, playlists, playingSongId, sticky, time, songs} = this.props;

    console.log('this.props', this.props, playingSongId)

    const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;

    // const songs = playlists[activePlaylist]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    // let dataSource = []
    // if (playlists[activePlaylist] && !playlists[activePlaylist].isFetching) {
    //   dataSource = ds.cloneWithRows(songs.items)
    // }
    var dataSource = playlist in playlists ? ds.cloneWithRows(playlists[playlist].items) : ds.cloneWithRows([]);

    return (
      <View style={{
        'width': deviceWidth,
        'height': playingSongId ? deviceHeight - 145 : deviceHeight - 70,
        'backgroundColor': '#fff'
      }}>
        { isFetching &&
          <View style={styles.progressbar}>
            <ProgressBar />
          </View>
        }
        { !isFetching  &&
          <ListView
            dataSource={dataSource}
            renderRow={(song, sectionId, rowId) => {
              return (
                <TouchableHighlight onPress={this.playSong.bind(this, rowId)}>
                  <View style={styles.card}>
                    <View>
                      <Image
                        key={songs[song]['artwork_url']}
                        style={styles.avatar}
                        source={{uri: songs[song]['artwork_url']}}
                      />
                    </View>
                    <View style={styles.description}>
                      <Text style={styles.username}>{songs[song].user.username}</Text>
                      <Text style={styles.title}>{songs[song].title}</Text>
                      <Text style={styles.count}>Played: {songs[song].playback_count}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )
            }}
          />
        }
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight - 50,
    backgroundColor: '#fff'
  },
  progressbar: {
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
