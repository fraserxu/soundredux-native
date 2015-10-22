var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Dimensions,
} = React;

var deviceWidth = Dimensions.get('window').width;

class Header extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sound Redux Native</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 50,
    backgroundColor: '#f50'
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
