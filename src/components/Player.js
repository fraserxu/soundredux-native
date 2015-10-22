var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
} = React;

var deviceWidth = Dimensions.get('window').width;

class Player extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Player</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 100,
    backgroundColor: '#ccc'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    height: 80,
    lineHeight: 80,
    marginTop: 25,
  }
});

export default Player
