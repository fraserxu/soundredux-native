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

import Icon from 'react-native-vector-icons/MaterialIcons'

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class Song extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    console.log('this.props', this.props)
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
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.title}>{song.title}</Text>
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
    resizeMode: 'cover',
    width: null,
    height: null
  },
  description: {
    flex: 1,
    marginLeft: 10,
    marginTop: 40,
    flexDirection: 'column'
  },
  back: {
    flex: 1,
    fontSize: 12,
    color: '#E2E2E2',
    margin: 20
  },
  username: {
    fontSize: 12,
    width: 50,
    margin: 10,
    padding: 10,
    color: '#E2E2E2',
    backgroundColor: '#000'
  },
  title: {
    flexWrap: 'wrap',
    color: '#fff',
    margin: 10,
    padding: 10,
    fontSize: 12,
    backgroundColor: '#000'
  }
});

export default Song
