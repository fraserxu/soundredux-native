var React = require('react-native')
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ListView,
  TouchableOpacity
} = React

import Icon from 'react-native-vector-icons/MaterialIcons'
// import RCTPlayer from 'react-native-player'

// console.log('RCTPlayer', RCTPlayer.isPlaying())

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

class Song extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    let { song, user } = this.props

    return (
      <View style={styles.container}>
        <Image
          source={{uri: song['artwork_url']}}
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
            <TouchableOpacity onPress={() => {return}}>
              <Icon style={styles.button} name="fast-rewind" size={40} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {return}}>
              <Icon style={styles.button} name="pause" size={40} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {return}}>
              <Icon style={styles.button} name="fast-forward" size={40} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    )
  }
}

var styles = StyleSheet.create({
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

export default Song
