import React from 'react-native'
let {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  Component
} = React
import RCTPlayer from 'react-native-player'
import shallowEqual from 'react-pure-render/shallowEqual'


import InteractionManager from 'InteractionManager'

import SongContainer from '../containers/SongContainer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {formatSeconds, formatStreamUrl} from '../utils/FormatUtils'
import { changeSong, changePlayerStatus } from '../actions/player'
import { CHANGE_TYPES, PLAY_STATUS } from '../constants/SongConstants'
let deviceWidth = Dimensions.get('window').width

class Player extends Component {

  constructor (props) {
    super(props)

    this.playSong = this.playSong.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.showSongDetail = this.showSongDetail.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    return shouldUpdate
  }

  componentWillMount () {
    DeviceEventEmitter.addListener('error', this.onError)
    DeviceEventEmitter.addListener('end', this.onEnd)
    DeviceEventEmitter.addListener('idle', this.onIdle)
    DeviceEventEmitter.addListener('buffering', this.onBuffering)
    DeviceEventEmitter.addListener('ready', this.onReady)
    DeviceEventEmitter.addListener('preparing', this.onReady)
  }

  componentDidMount () {
    const {dispatch, player, playingSongId, songs, users} = this.props
    const song = songs[playingSongId]
    if (song) {
      this.playSong(formatStreamUrl(song.stream_url))
    }
  }

  componentWillReceiveProps (nextProps) {
    const {playingSongId} = this.props
    const song = nextProps.songs[playingSongId]
    if (nextProps.playingSongId && nextProps.playingSongId === playingSongId) {
      return
    }

    this.playSong(formatStreamUrl(song.stream_url))
  }

  playSong (url) {
    // RCTPlayer.isPlaying((isPlaying) => {
    // if (isPlaying) {
    // RCTPlayer.stop()
    // }
    RCTPlayer.prepare(url, true)
    const {dispatch} = this.props
    dispatch(changePlayerStatus(PLAY_STATUS.PLAYING))
    // })
  }

  pause () {
    RCTPlayer.pause()
    const {dispatch} = this.props
    dispatch(changePlayerStatus(PLAY_STATUS.PAUSED))
  }

  resume () {
    RCTPlayer.resume()
    const {dispatch} = this.props
    dispatch(changePlayerStatus(PLAY_STATUS.PLAYING))
  }

  onBuffering () {
    console.log('on buffering...')
  }

  onIdle () {
    console.log('on idle...')
  }

  onError (err) {
    console.log('on error...', err)
  }

  onEnd () {
    const {dispatch} = this.props
    dispatch(changeSong(CHANGE_TYPES.NEXT))
  }

  onReady () {
    console.log('on ready...')
  }

  onPreparing () {
    console.log('on preparing...')
  }

  showSongDetail () {
    const { navigator } = this.props
    // InteractionManager.runAfterInteractions(() => {
    navigator.push({
      component: SongContainer,
      name: 'Song'
    })
    // })
  }

  render () {
    const {player, playingSongId, songs, users} = this.props
    const song = songs[playingSongId]
    const user = users[song.user_id]

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.player}>
            { player.status === PLAY_STATUS.PLAYING &&
              <TouchableOpacity onPress={this.pause}>
                <Icon name="pause" size={30} color="#FFF" />
              </TouchableOpacity>
            }
            { player.status === (PLAY_STATUS.PAUSED || PLAY_STATUS.INIT) &&
              <TouchableOpacity onPress={this.resume}>
                <Icon name="play-arrow" size={30} color="#FFF" />
              </TouchableOpacity>
            }
          </View>
          <TouchableOpacity onPress={this.showSongDetail.bind(this)}>
            <View style={styles.description}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.title}>{song.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
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
