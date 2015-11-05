var React = require('react-native')
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} = React
var RCTPlayer = require('react-native-player')
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter')
var Subscribable = require('Subscribable')

import Song from './Song'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {formatSeconds, formatStreamUrl} from '../utils/FormatUtils'
var deviceWidth = Dimensions.get('window').width

var Player = React.createClass({

  mixins: [Subscribable.Mixin],

  getInitialState: function() {
    return {
      isPlaying: false,
      isModalOpen: false
    }
  },

  componentWillMount: function() {
    this.addListenerOn(RCTDeviceEventEmitter, 'error', this.onError)
    this.addListenerOn(RCTDeviceEventEmitter, 'end', this.onEnd)
    this.addListenerOn(RCTDeviceEventEmitter, 'ready', this.onReady)
    this.addListenerOn(RCTDeviceEventEmitter, 'prepare', this.onReady)
  },

  componentDidMount: function() {
    const {dispatch, player, playingSongId, songs, users} = this.props
    const song = songs[playingSongId]
    if (song) {
      this.playSong(formatStreamUrl(song.stream_url))
    }
  },

  componentDidUpdate: function(prevProps) {
    const {dispatch, player, playingSongId, songs, users} = this.props
    const song = songs[playingSongId]
    if (prevProps.playingSongId && prevProps.playingSongId === this.props.playingSongId) {
      return
    }

    // new song and is playing
    if (this.state.isPlaying) {
      RCTPlayer.stop()
    }

    this.playSong(formatStreamUrl(song.stream_url))
  },

  playSong: function(url) {
    RCTPlayer.prepare(url, true)
    this.setState({
      isPlaying: true
    })
  },

  pause: function() {
    RCTPlayer.pause()
    this.setState({
      isPlaying: false
    })
  },

  resume: function() {
    RCTPlayer.resume()
    this.setState({
      isPlaying: true
    })
  },

  onError: function(err) {
    console.log(err)
  },

  onEnd: function() {
    this.setState({
      isPlaying: false
    })
    console.log("end")
  },

  onReady: function() {
    // RCTPlayer.start?()
  },

  showSongDetail: function(song, user) {
    const { navigator } = this.props

    navigator.push({
      component: Song,
      name: 'Song Detail',
      passProps: {
        song: song,
        user: user
      }
    })
  },

  render: function() {
    const {dispatch, player, playingSongId, songs, users} = this.props
    const song = songs[playingSongId]
    const user = users[song.user_id]

    let {isPlaying, isModalOpen} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.player}>
            { isPlaying &&
              <TouchableOpacity onPress={this.pause}>
                <Icon name="pause" size={30} color="#FFF" />
              </TouchableOpacity>
            }
            { !isPlaying &&
              <TouchableOpacity onPress={this.resume}>
                <Icon name="play-arrow" size={30} color="#FFF" />
              </TouchableOpacity>
            }
          </View>
          <TouchableOpacity onPress={this.showSongDetail.bind(this, song, user)}>
            <View style={styles.description}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.title}>{song.title}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
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
  player: {
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
    color: '#E2E2E2'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#fff',
    fontSize: 12
  }
})

export default Player
