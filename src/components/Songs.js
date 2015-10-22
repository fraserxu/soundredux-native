var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
} = React;

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;


class Header extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Songs</Text>
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

export default Header
