var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableHighlight
} = React;
var RCTAudio = require('react-native-player');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var Subscribable = require('Subscribable');

import {formatSeconds, formatStreamUrl} from '../utils/FormatUtils';
var deviceWidth = Dimensions.get('window').width;

var Player = React.createClass({

  mixins: [Subscribable.Mixin],

  getInitialState: function() {
    return {
      isPlaying: false,
      isPaused: false
    }
  },

  componentWillMount: function() {
      this.addListenerOn(RCTDeviceEventEmitter,
                       'error',
                       this.onError);
      this.addListenerOn(RCTDeviceEventEmitter,
                       'end',
                       this.onEnd);
      this.addListenerOn(RCTDeviceEventEmitter,
                       'ready',
                       this.onReady);
  },

  componentDidUpdate(prevProps) {
      const {dispatch, player, playingSongId, songs, users} = this.props;
      const song = songs[playingSongId];
      if (prevProps.playingSongId && prevProps.playingSongId === this.props.playingSongId) {
          return;
      }

      RCTAudio.stop()
      this.playSong(formatStreamUrl(song.stream_url))
  },

  playSong: function(url) {
    console.log('this.state', this.state)
    if (this.state.isPlaying) {
      RCTAudio.pause()
      this.setState({
        isPlaying: false,
        isPaused: true
      })
    } else {
      if (this.state.isPaused) {
        RCTAudio.resume()
        this.setState({
          isPlaying: true,
          isPaused: false
        })
      } else {
        RCTAudio.prepare(url, true)
      }
    }
  },

  onError: function(err) {
    console.log(err)
  },

  onEnd: function() {
    console.log("end")
  },

  onReady: function() {
    RCTAudio.start()
  },

  render: function() {
    const {dispatch, player, playingSongId, songs, users} = this.props;
    const song = songs[playingSongId];
    const user = users[song.user_id];

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <TouchableHighlight onPress={this.playSong(formatStreamUrl(song.stream_url))}>
              <Image
                style={styles.avatar}
                source={{uri: song.artwork_url}}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.description}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.title}>{song.title}</Text>
          </View>
        </View>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 70,
    padding: 10,
    backgroundColor: '#3a3f41',
    borderTopWidth: 2,
    borderTopColor: '#f50'
  },
  card: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
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
    fontSize: 12,
    paddingTop: 10,
    color: '#E2E2E2'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#fff',
    fontSize: 14
  },
});

export default Player
