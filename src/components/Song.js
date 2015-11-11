import React from 'react-native'
let {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  Image,
  ListView,
  TouchableOpacity
} = React
import RCTPlayer from 'react-native-player'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { changeSong, changePlayerStatus } from '../actions/player'
import { CHANGE_TYPES, PLAY_STATUS } from '../constants/SongConstants'
import { getLargeImage } from '../utils/FormatUtils'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

class Song extends React.Component {
  constructor (props) {
    super(props)

    this.changeSong = this.changeSong.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
  }

  changeSong (changeType) {
    const {dispatch} = this.props
    dispatch(changeSong(changeType))
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

  render () {
    const {player, playingSongId, songs, users} = this.props
    const song = songs[playingSongId]
    const user = users[song.user_id]

    return (
      <View style={styles.container}>
        <Image
          source={{uri: song['artwork_url'] ? getLargeImage(song['artwork_url']) : getLargeImage(user['avatar_url'])}}
          style={styles.backgroundImage}
        >
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Icon name="expand-more" size={40} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.description}>
            <View style={styles.background}>
              <Text style={styles.username}>{user.username}</Text>
            </View>
            <View style={styles.background}>
              <Text style={styles.title}>{song.title}</Text>
            </View>
          </View>
          <View style={styles.player}>
            <TouchableOpacity onPress={this.changeSong.bind(this, CHANGE_TYPES.PREV)}>
              <Icon style={styles.button} name="fast-rewind" size={40} color="#FFF" />
            </TouchableOpacity>

            { player.status === PLAY_STATUS.PLAYING &&
              <TouchableOpacity onPress={this.pause}>
                <Icon style={styles.button} name="pause" size={40} color="#FFF" />
              </TouchableOpacity>
            }
            { (player.status === PLAY_STATUS.PAUSED || player.status === PLAY_STATUS.INIT) &&
              <TouchableOpacity onPress={this.resume}>
                <Icon style={styles.button} name="play-arrow" size={40} color="#FFF" />
              </TouchableOpacity>
            }

            <TouchableOpacity onPress={this.changeSong.bind(this, CHANGE_TYPES.NEXT)}>
              <Icon style={styles.button} name="fast-forward" size={40} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3a3f41',
    backgroundColor: '#3a3f41',
    borderTopWidth: 2,
    borderTopColor: '#f50'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null
  },
  description: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'column'
  },
  back: {
    flex: 1,
    fontSize: 12,
    color: '#E2E2E2',
    margin: 20
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: 10,
    padding: 5,
  },
  username: {
    fontSize: 12,
    color: '#E2E2E2'
  },
  title: {
    flexWrap: 'wrap',
    color: '#fff',
    fontSize: 14
  },
  player: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: 10,
    padding: 5
  }
})

Song.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string
}

export default Song
