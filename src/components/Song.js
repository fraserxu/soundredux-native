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

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class Songs extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { playlists, activePlaylist } = this.props
    const songs = playlists[activePlaylist]

    return (
      <View style={styles.container}>
        { playlists[activePlaylist] && playlists[activePlaylist].isFetching &&
          <Text style={styles.title}>Loading...</Text>
        }
        { playlists[activePlaylist] && !playlists[activePlaylist].isFetching  &&
          <View>
            {
              songs.items.map((song, key) => {
                return (
                  <Image
                    key={key}
                    style={styles.avatar}
                    source={{uri: song['artwork_url']}}
                  />
                )
              })
            }
          </View>
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
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    height: 50,
    marginTop: 15,
    lineHeight: 50,
  }
});

export default Songs
