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

class Songs extends React.Component {
  constructor (props) {
    super(props)
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

  render () {
    const { playlists, activePlaylist } = this.props
    const songs = playlists[activePlaylist]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var dataSource
    if (playlists[activePlaylist] && !playlists[activePlaylist].isFetching) {
      dataSource = ds.cloneWithRows(songs.items)
    }

    return (
      <View style={styles.container}>
        { playlists[activePlaylist] && playlists[activePlaylist].isFetching &&
          <View style={styles.progressbar}>
            <ProgressBar />
          </View>
        }
        { playlists[activePlaylist] && !playlists[activePlaylist].isFetching  &&
          <ListView
            dataSource={dataSource}
            renderRow={(song) => {
              return (
                <View style={styles.card}>
                  <View>
                    <Image
                      key={song['artwork_url']}
                      style={styles.avatar}
                      source={{uri: song['artwork_url']}}
                    />
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.username}>{song.user.username}</Text>
                    <Text style={styles.title}>{song.title}</Text>
                    <Text style={styles.count}>Played: {song.playback_count}</Text>
                  </View>
                </View>
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
    height: deviceHeight - 150,
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
